import {useNavigate, useParams} from "react-router-dom";
import React, {ReactNode, useEffect, useState} from "react";
import {getById} from "../../api/api";
import {
    Button,
    Form,
    FormGroup,
    FormInput,
    FormSelect, Message,
} from "semantic-ui-react";
import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {OutEnum} from "../../enums/OutEnum";
import {InEnum} from "../../enums/InEnum";
import {Mig} from "../../dtos/mig";
import {SecondmentEnum} from "../../enums/SecondmentEnum";
import {NatEnum} from "../../enums/NatEnum";
import {OutTitleEnum} from "../../enums/OutTitleEnum";
import {InTitleEnum} from "../../enums/InTitleEnum";
import {MigTimeEnum} from "../../enums/MigTimeEnum";
import {handleSubmit} from "../../utils/detailPageUtil";
import Sources from "./Sources";
import {CollectionEnum} from "../../enums/CollectionEnum";
import TextEditor from "./textEditor/TextEditor";
import ModalWarning from "./ModalWarning";
import {SemanticColorUtil} from "../../utils/semanticColorUtil";

function MigDetail() {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<Mig>({} as Mig);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (id !== "new" && id) {
            getById(id, 'migStaging').then((result) => {
                setData(result as Mig);
                //parse result.content
                // change <span class=\"tooltip\">aaa<span class=\"tooltip-content\">bbb</span></span>
                // to <href=\"bbb\">aaa</a>
                // it is a string
                const content = result.content;
                const regex = /<span class="tooltip">(.*?)<span class="tooltip-content">(.*?)<\/span><\/span>/g;
                const subst = `<a href="[info]$2">$1</a>`;
                const newContent = content.replace(regex, subst);
                setData(prev => ({...prev, content: newContent}));


            }).catch((error) => {
                console.error("Failed to fetch data:", error);
                navigate('/mig');
            });
        } else {
            setData({} as Mig)
            setData(prev => ({...prev, time: [], article: []}))
        }
    }, [id, navigate]);

    const handleSubmitWrapper = async () => {
        handleSubmit(data, setData, id, navigate, setSuccess, setError, CollectionEnum.MIG_STAGING, 'mig')
    };

    const handleProductionPush = async () => {
        handleSubmit(data, setData, id, navigate, setSuccess, setError, CollectionEnum.MIG_STAGING, 'mig')
        handleSubmit(data, setData, id, navigate, setSuccess, setError, CollectionEnum.MIG_PRODUCTION, 'mig')
    };


    return (
        <Form error={error} success={success}>

            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''}
                           onChange={(e) => setData(prev => ({
                               ...prev, title: e.target.value
                           }))}/>
            </FormGroup>

            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='Covered'
                    value={data.covered || ''}
                    options={SemanticColorUtil.getDropdownOptions(CoveredEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, covered: value as CoveredEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.article || []}
                    label='Article'
                    multiple={true}
                    options={SemanticColorUtil.getDropdownOptions(ArticleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, article: value as ArticleEnum[]
                    }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    value={data.out_value || ''}
                    label='Out Value'
                    options={SemanticColorUtil.getDropdownOptions(OutEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, out_value: value as OutEnum
                    }))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='In Value'
                    value={data.in_value || ''}
                    options={SemanticColorUtil.getDropdownOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_value: value as InEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.out_title || ''}
                    label='Out Title'
                    options={SemanticColorUtil.getDropdownOptions(OutTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        out_title: value as OutTitleEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.in_title || ''}
                    label='In Title'
                    options={SemanticColorUtil.getDropdownOptions(InTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_title: value as InTitleEnum
                    }))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    multiple={true}
                    value={data.time || []}
                    label='Time'
                    options={SemanticColorUtil.getDropdownOptions(MigTimeEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, time: value as MigTimeEnum[]
                    }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    value={data.secondment || ''}
                    label='Secondment'
                    options={SemanticColorUtil.getDropdownOptions(SecondmentEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        secondment: value as SecondmentEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.nat || ''}
                    label='Nat'
                    options={SemanticColorUtil.getDropdownOptions(NatEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, nat: value as NatEnum
                    }))}
                />
            </FormGroup>
            For info on request use the same tool as for links, just put the text instead of a link, and in front of the
            text put [info]
            <FormGroup inline widths='equal'>
                <TextEditor value={data.content}
                            onChange={(value) => setData(prev => ({
                                ...prev, content: value
                            }))}
                />
            </FormGroup>

            <Sources sources={data.source || []} setSources={(newSources) => setData({...data, source: newSources})}/>
            <Message
                hidden={!success}
                success
                header='Success'
                content='Your submission was successful'
            />
            <Message
                hidden={!error}
                error
                header='Error'
                content='There was an error with your submission. Please try again.'
            />
            <Button positive onClick={handleSubmitWrapper}>Submit</Button>
            <Button negative onClick={() => navigate('/mig')}>Cancel</Button>
            {id !== "new" && id && <Button negative onClick={() => setModalOpen(true)}>
                Push on production
            </Button>}
            <ModalWarning modalOpen={modalOpen} setModalOpen={setModalOpen}
                          handleProductionPush={handleProductionPush}/>
        </Form>
    );
}

export default MigDetail;