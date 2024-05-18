import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Mig} from "../../dtos/mig";
import {getAllDocuments, getById} from "../../api/api";
import {CollectionEnum} from "../../enums/CollectionEnum";
import {handleSubmit} from "../../utils/detailPageUtil";
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
import {EnumValue} from "../../enums/EnumValue";
import {MongoRequest} from "../../dtos/mongo-request";

type DetailPageProps = {
    dataType: DataType;
    collectionStaging: CollectionEnum;
    collectionProduction: CollectionEnum;
}

function DetailPage<T extends Mig | SocSec | Tax>({
                                                      dataType,
                                                      collectionStaging,
                                                      collectionProduction
                                                  }: DetailPageProps) {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<T>({} as T);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [onProduction, setOnProduction] = useState(false);
    const [filterValues, setFilterValues] = useState<EnumValue[]>([]);

    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "enums"
    }

    useEffect(() => {
        getAllDocuments({...request}).then((result) => {
            setFilterValues((result as unknown as EnumValue[]).filter(
                (value) => value.domain.includes(dataType)));
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    }, []);

    useEffect(() => {
        if (id !== "new" && id) {
            getById(id, collectionStaging).then((result) => {
                setData(result as T);
                const content = result.content;
                const regex = /<span class="tooltip">(.*?)<span class="tooltip-content">(.*?)<\/span><\/span>/g;
                const subst = `<a href="[info]$2">$1</a>`;
                const newContent = content.replace(regex, subst);
                setData(prev => ({...prev, content: newContent}));


            }).catch((error) => {
                console.error("Failed to fetch data:", error);
                window.close();
            });
        } else {
            setData({} as T)

            if (dataType === DataType.MIG)
                setData(prev => ({...prev, time: [], article: []}))
            if (dataType === DataType.SOC_SEC)
                setData(prev => ({...prev, article: [], covered: [], statute: []}))
            if (dataType === DataType.TAX)
                setData(prev => ({...prev, article: [], covered: []}))
        }

        //check if object exists in production
        if (id && id !== "new") {
            getById(id, collectionProduction).then((result) => {
                if (result) {
                    setOnProduction(true);
                } else {
                    setOnProduction(false);
                }
                console.log("onProduction", onProduction)
            });
        }
    }, [id, navigate]);

    const handleSubmitWrapper = (collection: CollectionEnum, published: boolean, production: boolean): Promise<boolean> => {
        return handleSubmit({
            ...data,
            published: published
        }, setData, id, collection, published && !onProduction && production);
    }

    const handleProductionPush = async () => {
        if (await handleSubmitWrapper(collectionProduction, true, true)) {
            if (await handleSubmitWrapper(collectionStaging, true, false)) {
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

    const handleStagingPush = async () => {
        if (await handleSubmitWrapper(collectionStaging, false, false)) {
            setSuccess(true);
            setTimeout(() => {
                window.close();
            }, 1500);
        } else {
            setError(true);
        }
    };


    return (
        <Form>
            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''}
                           onChange={(e) => setData(prev => ({
                               ...prev, title: e.target.value
                           }))}/>
            </FormGroup>

            {dataType === DataType.MIG &&
                <MigForm fieldsConfig={filterValues}
                         data={data as Mig}
                         setData={setData as React.Dispatch<React.SetStateAction<Mig>>}/>}
            {dataType === DataType.SOC_SEC &&
                <SocSecForm fieldsConfig={filterValues}
                            data={data as SocSec}
                            setData={setData as React.Dispatch<React.SetStateAction<SocSec>>}/>}
            {dataType === DataType.TAX &&
                <TaxForm fieldsConfig={filterValues}
                         data={data as Tax}
                         setData={setData as React.Dispatch<React.SetStateAction<Tax>>}/>}

            For info on request use the same tool as for links, just put the text instead of a link, and in front of
            the
            text put [info]
            <FormGroup inline>
                <TextEditor
                    value={data.content}
                    onChange={(value) => setData(prev => ({
                        ...prev, content: value
                    }))}
                />
            </FormGroup>

            <Sources sources={data.source || []}
                     sourceEnum={filterValues.find(value => value._id === 'Source')!}
                     setSources={(newSources) => setData({...data, source: newSources})}/>
            {success && <SuccessToastr/>}
            {error && <ErrorToastr/>}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Button positive onClick={() => handleStagingPush()}>Save</Button>
                    <Button negative onClick={() => window.close()}>Cancel</Button>
                    {id !== "new" && id && <Button negative onClick={() => setModalOpen(true)}>
                        Push on production
                    </Button>}
                </div>
                {id && id !== "new" &&
                    <div style={{fontStyle: 'italic', color: 'grey'}}>
                        <div>last
                            modified: {data.last_modified_by}, {new Date(data.last_modified).toLocaleString()}</div>
                    </div>
                }
            </div>

            <ModalWarning modalOpen={modalOpen} setModalOpen={setModalOpen}
                          handleProductionPush={handleProductionPush}/>
        </Form>
    );
}

export default DetailPage;