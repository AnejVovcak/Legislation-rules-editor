import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Mig} from "../../dtos/mig";
import {getById} from "../../api/api";
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
    }, [id, navigate]);

    const handleSubmitWrapper = (collection: CollectionEnum) => {
        handleSubmit(data, setData, id, collection).then((result) => {
            //show success or error message
            if (result) {
                setSuccess(true);
                setTimeout(() => {
                    window.close();
                }, 1500);
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
            }
        })
    };

    const handleProductionPush = async () => {
        handleSubmitWrapper(collectionStaging)
        handleSubmitWrapper(collectionProduction)
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
                <MigForm data={data as Mig} setData={setData as React.Dispatch<React.SetStateAction<Mig>>}/>}
            {dataType === DataType.SOC_SEC &&
                <SocSecForm data={data as SocSec} setData={setData as React.Dispatch<React.SetStateAction<SocSec>>}/>}
            {dataType === DataType.TAX &&
                <TaxForm data={data as Tax} setData={setData as React.Dispatch<React.SetStateAction<Tax>>}/>}

            For info on request use the same tool as for links, just put the text instead of a link, and in front of the
            text put [info]
            <FormGroup inline>
                <TextEditor
                    value={data.content}
                    onChange={(value) => setData(prev => ({
                        ...prev, content: value
                    }))}
                />
            </FormGroup>

            <Sources sources={data.source || []} setSources={(newSources) => setData({...data, source: newSources})}/>
            {success && <SuccessToastr/>}
            {error && <ErrorToastr/>}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Button positive onClick={() => handleSubmitWrapper(collectionStaging)}>Submit</Button>
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