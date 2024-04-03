import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { getById } from "../../api/api";
import {Tax} from "../../dtos/tax";
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
import {TaxEnum} from "../../enums/TaxEnum";
import ReactQuill from "react-quill";
import {getFormOptions, performAction} from "../../utils/detailPageUtil";

function TaxDetail() {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<Tax>({} as Tax);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        if (id !== "new" && id) {
            getById(id, 'taxStaging').then((result) => {
                setData(result as Tax);
            }).catch((error) => {
                console.error("Failed to fetch data:", error);
                navigate('/tax');
            });
        } else {
            setData({} as Tax)
        }
    }, [id, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        performAction(id, data, navigate, setSuccess, setError, 'taxStaging', 'tax').then(() => {
            console.log(success, error)
        })
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setData(prev => ({...prev, [name]: value}));
    };

    return (
        <Form onSubmit={handleSubmit} error={error} success={success}>

            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''}
                           onChange={handleChange}/>
            </FormGroup>

            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    multiple={true}
                    name="tax-covered"
                    label='Covered'
                    value={data.covered || []}
                    options={getFormOptions(CoveredEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "tax-covered": value as CoveredEnum[]}))}
                />
                <FormSelect
                    fluid
                    name="tax-article"
                    label='Article'
                    multiple={true}
                    value={data.article || []}
                    options={getFormOptions(ArticleEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "tax-article": value as ArticleEnum[]}))}
                />
                <FormSelect
                    fluid
                    name="tax-out_value"
                    value={data.out_value || ''}
                    label='Out Value'
                    options={getFormOptions(OutEnum)}
                    placeholder='Out Value'
                    onChange={(e, {value}) => setData(prev => ({...prev, "tax-out_value": value as OutEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    name="tax-in_value"
                    value={data.in_value || ''}
                    label='In Value'
                    options={getFormOptions(InEnum)}
                    placeholder='In Value'
                    onChange={(e, {value}) => setData(prev => ({...prev, "tax-in_value": value as InEnum}))}
                />
                <FormSelect
                    fluid
                    name="tax-empl"
                    value={data.empl || ''}
                    label='Empl'
                    options={getFormOptions(EmplEnum)}
                    placeholder='Empl'
                    onChange={(e, {value}) => setData(prev => ({...prev, "tax-empl": value as EmplEnum}))}
                />
                <FormSelect
                    fluid
                    name="tax-tax"
                    value={data.tax || ''}
                    label='Tax'
                    options={getFormOptions(TaxEnum)}
                    placeholder='Tax'
                    onChange={(e, {value}) => setData(prev => ({...prev, "tax-tax": value as TaxEnum}))}
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
            <Button positive type="submit">Submit</Button>
            <Button negative onClick={() => navigate('/tax')}>Cancel</Button>
        </Form>
    );
}

export default TaxDetail;