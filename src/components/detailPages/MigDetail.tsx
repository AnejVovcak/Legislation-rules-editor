import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createObject, getById, updateObject} from "../../api/api";
import {
    Button,
    Form,
    FormButton,
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
            }).catch((error) => {
                console.error("Failed to fetch data:", error);
                navigate('/mig');
            });
        } else {
            setData({} as Mig)
            //set migration-time to empty array
            setData(prev => ({...prev, "migration-time": []}))
        }
    }, [id, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        performAction(id, data, navigate, setSuccess, setError, 'migStaging', 'mig').then(() => {
            console.log(success, error)
        })
    };


    return (
        <Form onSubmit={handleSubmit} error={error} success={success}>

            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''}
                           onChange={(e) => setData(prev => ({...prev, title: e.target.value}))}/>
            </FormGroup>

            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='Covered'
                    value={data["migration-covered"] || ''}
                    options={getFormOptions(CoveredEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-covered": value as CoveredEnum}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-article"] || ''}
                    label='Article'
                    options={getFormOptions(ArticleEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-article": value as ArticleEnum}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-out_value"] || ''}
                    label='Out Value'
                    options={getFormOptions(OutEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-out_value": value as OutEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='In Value'
                    value={data["migration-in_value"] || ''}
                    options={getFormOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-in_value": value as InEnum}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-out_title"] || ''}
                    label='Out Title'
                    options={getFormOptions(OutTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        "migration-out_title": value as OutTitleEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data["migration-in_title"] || ''}
                    label='In Title'
                    options={getFormOptions(InTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-in_title": value as InTitleEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    multiple={true}
                    value={data["migration-time"] || []}
                    label='Time'
                    options={getFormOptions(MigTimeEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-time": value as MigTimeEnum[]}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-secondment"] || ''}
                    label='Secondment'
                    options={getFormOptions(SecondmentEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        "migration-secondment": value as SecondmentEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data["migration-nat"] || ''}
                    label='Nat'
                    options={getFormOptions(NatEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-nat": value as NatEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <ReactQuill theme="snow" value={data.content}
                            onChange={(value) => setData(prev => ({...prev, content: value}))}/>
            </FormGroup>

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