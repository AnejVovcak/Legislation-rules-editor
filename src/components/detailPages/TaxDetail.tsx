import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createTax, getTaxById, updateTax} from "../../api/api";
import {Tax} from "../../dtos/tax";
import {
    Form,
    FormButton,
    FormCheckbox,
    FormGroup,
    FormInput,
    FormRadio,
    FormSelect,
    FormTextArea
} from "semantic-ui-react";
import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {OutEnum} from "../../enums/OutEnum";
import {InEnum} from "../../enums/InEnum";
import {EmplEnum} from "../../enums/EmplEnum";
import {TaxEnum} from "../../enums/TaxEnum";
import ReactQuill from "react-quill";

function TaxDetail() {
    const {id} = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<Tax>({} as Tax);
    const isNew = !id; // Determine if this is a new object creation

    useEffect(() => {
        if (!isNew && id !== "new") {
            getTaxById(id).then((result) => {
                setData(result);
            }).catch((error) => {
                console.error("Failed to fetch data:", error);
            });
        } else {
            setData({} as Tax);
        }
    }, [id, isNew]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isNew || id === "new") {
            // Implement object creation logic
            await createTaxObject(data)
        } else {
            // Implement update logic
            await updateTaxObject(id, data)
        }
        // navigate('/tax'); // Redirect to the list page
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const createTaxObject = async (data: Tax) => {
        createTax(data).then((result) => {
            console.log("TaxEnum created:", result);
        }).catch((error) => {
            console.error("Failed to create TaxEnum:", error);
        });
    }

    const updateTaxObject = async (id: string, data: Tax) => {
        updateTax(id, data).then((result) => {
            console.log("TaxEnum updated:", result);
        }).catch((error) => {
            console.error("Failed to update TaxEnum:", error);
        });
    }

    return (
        <Form onSubmit={handleSubmit} style={{padding: '3em'}}>

            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''}
                           onChange={handleChange}/>
            </FormGroup>

            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    name="tax-covered"
                    label='Covered'
                    value={data["tax-covered"] || ''}
                    options={Object.entries(CoveredEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    placeholder='Covered'
                    onChange={(e, { value }) => setData(prev => ({ ...prev, "tax-covered": value as CoveredEnum}))}
                />
                <FormSelect
                    fluid
                    name="tax-article"
                    value={data["tax-article"] || ''}
                    label='Article'
                    options={Object.entries(ArticleEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    onChange={(e, { value }) => setData(prev => ({ ...prev, "tax-article": value as ArticleEnum}))}
                />
                <FormSelect
                    fluid
                    name="tax-out_value"
                    value={data["tax-out_value"] || ''}
                    label='Out Value'
                    options={Object.entries(OutEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    placeholder='Out Value'
                    onChange={(e, { value }) => setData(prev => ({ ...prev, "tax-out_value": value as OutEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    name="tax-in_value"
                    value={data["tax-in_value"] || ''}
                    label='In Value'
                    options={Object.entries(InEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    placeholder='In Value'
                    onChange={(e, { value }) => setData(prev => ({ ...prev, "tax-in_value": value as InEnum}))}
                />
                <FormSelect
                    fluid
                    name="tax-empl"
                    value={data["tax-empl"] || ''}
                    label='Empl'
                    options={Object.entries(EmplEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    placeholder='Empl'
                    onChange={(e, { value }) => setData(prev => ({ ...prev, "tax-empl": value as EmplEnum}))}
                />
                <FormSelect
                    fluid
                    name="tax-tax"
                    value={data["tax-tax"] || ''}
                    label='Tax'
                    options={Object.entries(TaxEnum).map(([key, value]) => {
                        return {text: value, value: value, key: key}
                    })}
                    placeholder='Tax'
                    onChange={(e, { value }) => setData(prev => ({ ...prev, "tax-tax": value as TaxEnum}))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <ReactQuill theme="snow" value={data.content}
                            onChange={(value) => setData(prev => ({...prev, content: value}))}/>
            </FormGroup>
            <FormButton type="submit">Submit</FormButton>
        </Form>
    );
}

export default TaxDetail;