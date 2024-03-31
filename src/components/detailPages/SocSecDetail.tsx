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
import {EmplEnum} from "../../enums/EmplEnum";
import ReactQuill from "react-quill";
import {getFormOptions, performAction} from "../../utils/detailPageUtil";
import {SocSec} from "../../dtos/socSec";
import {Empl0EQEmpl1Enum} from "../../enums/Empl0EQEmpl1Enum";
import {StatueEnum} from "../../enums/StatueEnum";

function SocSecDetail() {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<SocSec>({} as SocSec);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        if (id !== "new" && id) {
            getById(id, 'socSecStaging').then((result) => {
                setData(result as SocSec);
            }).catch((error) => {
                console.error("Failed to fetch data:", error);
                navigate('/tax');
            });
        } else {
            setData({} as SocSec)
        }
    }, [id, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        performAction(id, data, navigate, setSuccess, setError, 'socSecStaging', 'socSec').then(() => {
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
                    name="ssc-covered"
                    label='Covered'
                    value={data["ssc-covered"] || []}
                    options={getFormOptions(CoveredEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({...prev, "ssc-covered": value as CoveredEnum[]}))}
                />
                <FormSelect
                    fluid
                    name="ssc-article"
                    label='Article'
                    multiple={true}
                    value={data["ssc-article"] || []}
                    options={getFormOptions(ArticleEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({...prev, "ssc-article": value as ArticleEnum[]}))}
                />
                <FormSelect
                    fluid
                    name="ssc-statute"
                    value={data["ssc-statute"] || []}
                    label='Statute'
                    multiple={true}
                    options={getFormOptions(OutEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({...prev, "ssc-statute": value as StatueEnum[]}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    name="ssc-out_value"
                    value={data["ssc-out_value"] || ''}
                    label='Out Value'
                    options={getFormOptions(OutEnum)}
                    onChange={(e, {value}) =>
                        setData(prev => ({...prev, "tax-in_value": value as OutEnum}))}
                />
                <FormSelect
                    fluid
                    name="ssc-in_value"
                    value={data["ssc-in_value"] || ''}
                    label='In Value'
                    options={getFormOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "ssc-in_value": value as InEnum}))}
                />
                <FormSelect
                    fluid
                    name="ssc-empl"
                    value={data["ssc-empl"] || ''}
                    label='Empl'
                    options={getFormOptions(EmplEnum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "ssc-empl": value as EmplEnum}))}
                />
                <FormSelect
                    fluid
                    name="ssc-if_empl0_eq_empl1"
                    value={data["ssc-if_empl0_eq_empl1"] || ''}
                    label='If Empl0 Eq Empl1'
                    options={getFormOptions(Empl0EQEmpl1Enum)}
                    onChange={(e, {value}) => setData(prev => ({...prev, "ssc-if_empl0_eq_empl1": value as Empl0EQEmpl1Enum}))}
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
            <Button negative onClick={() => navigate('/socSec')}>Cancel</Button>
        </Form>
    );
}

export default SocSecDetail;