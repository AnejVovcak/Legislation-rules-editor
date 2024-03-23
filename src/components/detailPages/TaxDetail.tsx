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


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

function TaxDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // For navigation
    const [data, setData] = useState<Tax>({} as Tax);
    const isNew = !id; // Determine if this is a new object creation

    useEffect(() => {
        if (!isNew) {
            getTaxById(id).then((result) => {
                setData(result);
            }).catch((error) => {
                console.error("Failed to fetch data:", error);
            });
        }
    }, [id, isNew]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isNew) {
            // Implement object creation logic
            await createTaxObject(data)
        } else {
            // Implement update logic
            await updateTaxObject(id, data)
        }
        navigate('/tax'); // Redirect to the list page
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
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
        // <form onSubmit={handleSubmit}>
        //     {/* Form fields here, use `data` to populate them */}
        //     <input name="name" value={data. || ''} onChange={handleChange} />
        //     {/* Add more inputs as needed */}
        //     <button type="submit">{isNew ? 'Create' : 'Update'}</button>
        // </form>

        <Form onSubmit={handleSubmit}>
            <FormGroup widths='equal'>
                <FormInput name="title" fluid label='Title' placeholder='Title' value={data.title || ''} onChange={handleChange} />
                <FormInput fluid label='Last name' placeholder='Last name' />
                <FormSelect
                    fluid
                    label='Gender'
                    options={options}
                    placeholder='Gender'
                />
            </FormGroup>
            <FormGroup inline>
                <label>Size</label>
                <FormRadio
                    label='Small'
                    value='sm'
                    checked={data.content === 'sm'}
                />
                <FormRadio
                    label='Medium'
                    value='md'
                    checked={data.content === 'md'}
                />
                <FormRadio
                    label='Large'
                    value='lg'
                    checked={data.content === 'lg'}
                />
            </FormGroup>
            <FormTextArea label='About' placeholder='Tell us more about you...' />
            <FormCheckbox label='I agree to the Terms and Conditions' />
            <FormButton type="submit">Submit</FormButton>
        </Form>
    );
}

export default TaxDetail;