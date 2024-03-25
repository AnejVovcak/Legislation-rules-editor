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
        }
    }, [id, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const performAction = async () => {
            console.log(id)
            try {
                if (id === "new") {
                    await createObject(data, 'migStaging');
                } else if (id) {
                    await updateObject(id, data, 'migStaging');
                } else {
                    navigate('/mig');
                    return;
                }
                setSuccess(true);
                setError(false);
            } catch (error) {
                setError(true);
                setSuccess(false);
            }
        };

        performAction().then(() => {
            console.log(success, error)
        })
    };


    return (
        <Form onSubmit={handleSubmit} style={{padding: '3em'}} error={error} success={success}>

            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''}
                           onChange={(e) => setData(prev => ({...prev, title: e.target.value}))}/>
            </FormGroup>

            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='Covered'
                    value={data["migration-covered"] || ''}
                    options={Object.entries(CoveredEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-covered": value as CoveredEnum}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-article"] || ''}
                    label='Article'
                    options={Object.entries(ArticleEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-article": value as ArticleEnum}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-out_value"] || ''}
                    label='Out Value'
                    options={Object.entries(OutEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-out_value": value as OutEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='In Value'
                    value={data["migration-in_value"] || ''}
                    options={Object.entries(InEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-in_value": value as InEnum}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-out_title"] || ''}
                    label='Out Title'
                    options={Object.entries(OutTitleEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        "migration-out_title": value as OutTitleEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data["migration-in_title"] || ''}
                    label='In Title'
                    options={Object.entries(InTitleEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-in_title": value as InTitleEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    multiple={true}
                    value={data["migration-time"] || []}
                    label='Time'
                    options={Object.entries(MigTimeEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({...prev, "migration-time": value as MigTimeEnum[]}))}
                />
                <FormSelect
                    fluid
                    value={data["migration-secondment"] || ''}
                    label='Secondment'
                    options={Object.entries(SecondmentEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        "migration-secondment": value as SecondmentEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data["migration-nat"] || ''}
                    label='Nat'
                    options={Object.entries(NatEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
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