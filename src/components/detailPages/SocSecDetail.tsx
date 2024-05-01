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
import {EmplEnum} from "../../enums/EmplEnum";
import {handleSubmit} from "../../utils/detailPageUtil";
import {SocSec} from "../../dtos/socSec";
import {Empl0EQEmpl1Enum} from "../../enums/Empl0EQEmpl1Enum";
import {StatueEnum} from "../../enums/StatueEnum";
import Sources from "./Sources";
import {CollectionEnum} from "../../enums/CollectionEnum";
import TextEditor from "./textEditor/TextEditor";
import ModalWarning from "./ModalWarning";
import {SemanticColorUtil} from "../../utils/semanticColorUtil";

function SocSecDetail() {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<SocSec>({} as SocSec);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        if (id !== "new" && id) {
            getById(id, 'socSecStaging').then((result) => {
                setData(result as SocSec);

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
                navigate('/socSec');
            });
        } else {
            setData({} as SocSec)
            setData(prev => ({...prev, article: [], covered: [], statute: []}))
        }
    }, [id, navigate]);

    const handleSubmitWrapper = async () => {
        handleSubmit(data,setData, id, navigate, setSuccess, setError, 'socSecStaging', 'socSec')
    };

    const handleProductionPush = async () => {
        handleSubmit(data, setData, id, navigate, setSuccess, setError, CollectionEnum.SOC_SEC_STAGING, 'socSec')
        handleSubmit(data, setData, id, navigate, setSuccess, setError, CollectionEnum.SOC_SEC_PRODUCTION, 'socSec')
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
                    multiple={true}
                    label='Covered'
                    value={data.covered || []}
                    options={SemanticColorUtil.getDropdownOptions(CoveredEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({...prev, covered: value as CoveredEnum[]}))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    label='Article'
                    multiple={true}
                    value={data.article || []}
                    options={SemanticColorUtil.getDropdownOptions(ArticleEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({
                            ...prev, article: value as ArticleEnum[]
                        }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    value={data.statute || []}
                    label='Statue'
                    multiple={true}
                    options={SemanticColorUtil.getDropdownOptions(StatueEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({
                            ...prev, statute: value as StatueEnum[]
                        }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    value={data.out_value || ''}
                    label='Out Value'
                    options={SemanticColorUtil.getDropdownOptions(OutEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({
                            ...prev, out_value: value as OutEnum
                        }))}
                />
                <FormSelect
                    fluid
                    value={data.in_value || ''}
                    label='In Value'
                    options={SemanticColorUtil.getDropdownOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_value: value as InEnum
                    }))}
                />
                < FormSelect
                    fluid
                    value={data.empl || ''}
                    label='Empl'
                    options={SemanticColorUtil.getDropdownOptions(EmplEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, empl: value as EmplEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.if_empl0_eq_empl1 || ''}
                    label='If Empl0 Eq Empl1'
                    options={SemanticColorUtil.getDropdownOptions(Empl0EQEmpl1Enum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, if_empl0_eq_empl1: value as Empl0EQEmpl1Enum
                    }))}
                />
            </FormGroup>
            For info on request use the same tool as for links, just put the text instead of a link, and in front of the text put [info]
            <FormGroup inline widths='equal'>
                <TextEditor value={data.content}
                            onChange={(value) => setData(prev => ({
                                ...prev, content: value
                            }))}
                />
            </FormGroup>
            <Sources sources={data.source || []} setSources={(newSources) => setData({ ...data, source: newSources })} />
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
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Button positive onClick={handleSubmitWrapper}>Submit</Button>
                    <Button negative onClick={() => navigate('/socSec')}>Cancel</Button>
                    {id !== "new" && id && <Button negative onClick={() => setModalOpen(true)}>
                        Push on production
                    </Button>}
                </div>
                <div style={{fontStyle: 'italic', color: 'grey'}}>
                    <div>last modified: {data.last_modified_by}, {new Date(data.last_modified).toLocaleString()}</div>
                </div>
            </div>
        </Form>
    );
}

export default SocSecDetail;