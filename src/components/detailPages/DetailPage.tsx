import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Mig} from "../../dtos/mig";
import {deleteObject, getAllDocuments, getById} from "../../api/api";
import {CollectionEnum} from "../../enums/CollectionEnum";
import {Button, Form, FormGroup, FormInput} from "semantic-ui-react";
import TextEditor from "./textEditor/TextEditor";
import Sources from "./Sources";
import SuccessToastr from "../toastrs/SuccessToastr";
import ErrorToastr from "../toastrs/ErrorToastr";
import ModalWarning from "./ModalWarning";
import {DataType} from "../../enums/DataType";
import {Tax} from "../../dtos/tax";
import {SocSec} from "../../dtos/socSec";
import MigForm from "./forms/MigForm";
import SocSecForm from "./forms/SocSecForm";
import TaxForm from "./forms/TaxForm";
import {CodebookValue} from "../../enums/CodebookValue";
import {handleSubmit} from "../../utils/detailPageUtil";

type DetailPageProps = {
    dataType: DataType;
    collectionDev: CollectionEnum;
    collectionStaging: CollectionEnum;
    collectionProduction: CollectionEnum;
}

function DetailPage<T extends Mig | SocSec | Tax>({
                                                      dataType,
                                                      collectionDev,
                                                      collectionStaging,
                                                      collectionProduction
                                                  }: DetailPageProps) {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<T>({} as T);
    const [success, setSuccess] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [error, setError] = useState(false);
    const [publishModalOpen, setPublishModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [filterValues, setFilterValues] = useState<CodebookValue[]>([]);
    const [isDev, setIsDev] = useState<boolean>(false);
    const [validForm, setValidForm] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        getAllDocuments(CollectionEnum.CODEBOOK).then((result) => {
            setFilterValues((result as unknown as CodebookValue[]).filter(
                (value) => value.domain.includes(dataType) || value._id === 'source'));
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    }, []);

    useEffect(() => {
        const fetchData = async (id: string, collection: CollectionEnum) => {
            try {
                const result = await getById(id, collection);
                setData(result as T);
                const content = result.content;
                const regex = /<span class="tooltip">(.*?)<span class="tooltip-content">(.*?)<\/span><\/span>/g;
                const subst = `<a href="[info]$2">$1</a>`;
                const newContent = content.replace(regex, subst);
                setData(prev => ({...prev, content: newContent}));
            } catch (error) {
                console.error("Failed to fetch data:", error);
                navigate('/');
            }
        };

        const initializeData = () => {
            setData({} as T);
            // if url contains the word dev, set isDev to true
            if (window.location.pathname.includes("/dev")) {
                setIsDev(true);
            }
            switch (dataType) {
                case DataType.MIG:
                    setData(prev => ({...prev, time: [], article: [], content: ''}));
                    break;
                case DataType.SOC_SEC:
                    setData(prev => ({...prev, article: [], covered: [], statute: [], content: ''}));
                    break;
                case DataType.TAX:
                    setData(prev => ({...prev, article: [], covered: [], content: ''}));
                    break;
                default:
                    break;
            }
        };

        const loadData = async () => {
            if (id && id !== "new") {
                if (window.location.pathname.includes("/dev")) {
                    await fetchData(id, collectionDev);
                    setIsDev(true);
                } else {
                    await fetchData(id, collectionStaging);
                }
            } else {
                initializeData();
            }
        };

        loadData();
    }, [id, navigate]);


    const handleSubmitWrapper = (collection: CollectionEnum, published: boolean): Promise<boolean> => {
        return handleSubmit({
            ...data,
            published: published
        }, setData, id === 'new' ? undefined : id, collection);
    }

    const handleProductionPush = async () => {
        setSubmitted(true)

        if (!validForm || !data.title || data.title.trim().length === 0) {
            setError(true);
            return;
        } else {
            setError(false);
        }
        if (await handleSubmitWrapper(collectionProduction, true)) {
            if (await handleSubmitWrapper(collectionStaging, true)) {
                setSuccess(true);
                setTimeout(() => {
                    window.close();
                }, 1500);
            } else {
                setError(true);
            }
        } else {
            setError(true);
        }
    };

    const handleNonProdPush = async () => {
        setSubmitted(true)

        if (!validForm || !data.title || data.title.trim().length === 0) {
            setError(true);
            return;
        } else {
            setError(false);
        }
        if (await handleSubmitWrapper(isDev ? collectionDev : collectionStaging, false)) {
            setSuccess(true);
            setTimeout(() => {
                window.close();
            }, 1500);
        } else {
            setError(true);
        }
    };

    const handleDelete = async () => {
        if (await deleteObject(id!, isDev ? collectionDev : collectionStaging)) {
            if (await deleteObject(id!, collectionProduction)) {
                setSuccessDelete(true);
                setTimeout(() => {
                    window.close();
                }, 1500);
            } else {
                setError(true);
            }
        } else {
            setError(true);
        }
    }


    return (
        <Form>
            <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                {data &&
                    <FormInput name="title" label='Title' placeholder='Title' value={data.title || ''}
                               error={(data.title == undefined || data.title.trim().length === 0) && submitted}
                               onChange={(e) => setData(prev => ({
                                   ...prev, title: e.target.value
                               }))}/>}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Button positive onClick={() => handleNonProdPush()}>Save</Button>
                        <Button negative onClick={() => window.close()}>Cancel</Button>
                        {id !== "new" && id && !isDev && <Button negative onClick={() => setPublishModalOpen(true)}>
                            Publish
                        </Button>}
                        {id !== "new" && id && <Button negative onClick={() => setDeleteModalOpen(true)}>
                            Delete
                        </Button>}
                    </div>
                </div>
            </div>

            {data && dataType === DataType.MIG &&
                <MigForm fieldsConfig={filterValues}
                         onValidationChange={setValidForm}
                         submitted={submitted}
                         data={data as Mig}
                         setData={setData as React.Dispatch<React.SetStateAction<Mig>>}/>}
            {data && dataType === DataType.SOC_SEC &&
                <SocSecForm fieldsConfig={filterValues}
                            onValidationChange={setValidForm}
                            submitted={submitted}
                            data={data as SocSec}
                            setData={setData as React.Dispatch<React.SetStateAction<SocSec>>}/>}
            {data && dataType === DataType.TAX &&
                <TaxForm fieldsConfig={filterValues}
                         onValidationChange={setValidForm}
                         submitted={submitted}
                         data={data as Tax}
                         setData={setData as React.Dispatch<React.SetStateAction<Tax>>}/>}

            For info on request use the same tool as for links, just put the text instead of a link, and in front of
            the
            text put [info]
            <FormGroup inline>
                {data &&
                    <TextEditor
                        value={data.content}
                        onChange={(value) => setData(prev => ({
                            ...prev, content: value
                        }))}
                    />}
            </FormGroup>
            {data && filterValues &&
                <Sources sources={data.source || []}
                         sourceEnum={filterValues.find(value => value._id === 'source')!}
                         setSources={(newSources) => setData({...data, source: newSources})}/>
            }
            {success && <SuccessToastr/>}
            {successDelete && <SuccessToastr content={"Data deleted!"}/>}
            {error && <ErrorToastr/>}
            {id && id !== "new" && data &&
                <div style={{fontStyle: 'italic', color: 'grey', textAlign: 'right'}}>
                    <div>last
                        modified: {data.last_modified_by}, {new Date(data.last_modified).toLocaleString()}</div>
                </div>
            }
            <ModalWarning modalHeader={"Publish"}
                          modalContent={"Are you sure you want to publish this on production? " +
                              "Changes will be visible immediately visible to the public."}
                          modalOpen={publishModalOpen} setModalOpen={setPublishModalOpen}
                          onClickEvent={handleProductionPush}/>

            <ModalWarning modalHeader={"Delete"}
                          modalContent={"Are you sure you want to delete this element? " +
                              "This action cannot be undone. Element will be deleted from both staging and production."}
                          modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}
                          onClickEvent={handleDelete}/>
        </Form>
    );
}

export default DetailPage;