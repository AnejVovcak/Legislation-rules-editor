import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { getById } from "../../api/api";
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
import ReactQuill from "react-quill";
import {Mig} from "../../dtos/mig";
import {SecondmentEnum} from "../../enums/SecondmentEnum";
import {NatEnum} from "../../enums/NatEnum";
import {OutTitleEnum} from "../../enums/OutTitleEnum";
import {InTitleEnum} from "../../enums/InTitleEnum";
import {MigTimeEnum} from "../../enums/MigTimeEnum";
import {getFormOptions, performAction} from "../../utils/detailPageUtil";
import Sources from "./Sources";

function MigDetail() {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<Mig>({} as Mig);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
            setData(prev => ({...prev, time: [],article: []}))
        }
    }, [id, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {      
        event.preventDefault();

        //parse data.content
        // change <a href="[info]bbb">aaa</a> to <span class="tooltip">aaa<span class="tooltip-content">bbb</span></span>
        // only if there is a href="[info] in the content
        // it is a string
        const content = data.content;
        const regex = /<a href="\[info\](.*?)">(.*?)<\/a>/g;
        const subst = `<span class="tooltip">$2<span class="tooltip-content">$1</span></span>`;
        const newContent = content.replace(regex, subst);
        setData(prev => ({...prev, content: newContent}));

        performAction(id, data, navigate, setSuccess, setError, 'migStaging', 'mig').then(() => {
            console.log(success, error)
        })
    };


    return (
        <Form onSubmit={handleSubmit} error={error} success={success}>

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
                    options={getFormOptions(CoveredEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, covered: value as CoveredEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.article || []}
                    label='Article'
                    multiple={true}
                    options={getFormOptions(ArticleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, article: value as ArticleEnum[]
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.out_value || ''}
                    label='Out Value'
                    options={getFormOptions(OutEnum)}
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
                    options={getFormOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_value: value as InEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.out_title || ''}
                    label='Out Title'
                    options={getFormOptions(OutTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        out_title: value as OutTitleEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.in_title || ''}
                    label='In Title'
                    options={getFormOptions(InTitleEnum)}
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
                    options={getFormOptions(MigTimeEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, time: value as MigTimeEnum[]
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.secondment || ''}
                    label='Secondment'
                    options={getFormOptions(SecondmentEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        secondment: value as SecondmentEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.nat || ''}
                    label='Nat'
                    options={getFormOptions(NatEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, nat: value as NatEnum
                    }))}
                />
            </FormGroup>
            For info on request use the same tool as for links, just put the text instead of a link, and in front of the text put [info]
            <FormGroup inline widths='equal'>
                <ReactQuill theme="snow" value={data.content}
                            onChange={(value) => setData(prev => ({
                                ...prev, content: value
                            }))}/>
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
            <Button positive type='submit'>Submit</Button>
            <Button negative onClick={() => navigate('/mig')}>Cancel</Button>

        </Form>
    );
}

export default MigDetail;