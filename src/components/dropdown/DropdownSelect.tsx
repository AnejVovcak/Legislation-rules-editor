import React, {SyntheticEvent, useEffect, useState} from "react";
import {DropdownProps, FormSelect, Modal, Button, Message} from "semantic-ui-react";
import {updateEnumObject} from "../../api/api";
import {deleteEnumObject} from "../../api/api";
import {EnumValue} from "../../enums/EnumValue";
import {SemanticColorUtil} from "../../utils/semanticColorUtil";

type GenericData = { [key: string]: any };

type DropdownSelectProps = {
    data: GenericData,
    setData: React.Dispatch<React.SetStateAction<DropdownProps>>,
    fieldKey: string,
    label: string,
    multiple?: boolean,
    fieldsConfig: EnumValue[],
    onErrorChange: (filedKey:string,hasError: boolean,) => void
    submitted: boolean
};

const DropdownSelect = ({
                            data,
                            setData,
                            fieldKey,
                            label,
                            multiple = false,
                            fieldsConfig,
                            onErrorChange,
                            submitted
                        }: DropdownSelectProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const options = SemanticColorUtil.getDropdownOptions(fieldsConfig, fieldKey);

    useEffect(() => {
        const initialError = (!data[fieldKey] || data[fieldKey] === '') && !multiple;
        setError(initialError);
        if (onErrorChange) {
            onErrorChange(fieldKey,initialError);
        }
    }, [data]);

    const handleChange = (_e: any, {value}: any) => {
        const hasError = (!value || value === '') && !multiple;
        setError(hasError);
        if (onErrorChange) {
            onErrorChange(fieldKey,hasError);
        }
        setData(prev => ({
            ...prev, [fieldKey]: multiple ? value : value
        }));
    };

    const handleAddition = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        console.log("data.value", data.value);
        updateEnumObject(fieldKey, fieldsConfig.find((value) => value._id === fieldKey)!, data.value as string).then(() => {
            // handle success
        });
    };

    const handleDelete = () => {
        //print the item to delete
        console.log('Deleting item:', itemToDelete);
        //print fieldKey
        console.log('Field key:', fieldKey);

        if (itemToDelete) {
            //delete the item
            deleteEnumObject(itemToDelete, fieldKey).then(() => {
                // handle success
                // refresh the page
                window.location.reload();
            });
        }

        setModalOpen(false);
    };

    return (
        <>
            <FormSelect
                fluid
                search
                allowAdditions
                error={error && submitted}
                label={label}
                multiple={multiple}
                value={data[fieldKey] || (multiple ? [] : '')}
                options={options.map(option => ({
                    ...option,
                    content: (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>{option.text}</span>
                            <button
                                style={{
                                    marginLeft: 'auto',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'red',
                                    fontSize: '1em',
                                    padding: '1px', // Increased padding for larger clickable area
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Delete button clicked for', option.text);
                                    setItemToDelete(option.value as string);
                                    setModalOpen(true);
                                }}
                            >
                                <span style={{fontSize: '1.5em'}}>&times;</span> {/* Increased font size of × */}
                            </button>
                        </div>
                    )
                }))}
                onChange={handleChange}
                renderLabel={multiple ? (label) => ({
                    color: label.color,
                    content: label.text,
                }) : undefined}
                onAddItem={handleAddition}
            />

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                size='small'
            >
                <Modal.Header>Delete Confirmation</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this item?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>
                        No
                    </Button>
                    <Button positive onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default DropdownSelect;
