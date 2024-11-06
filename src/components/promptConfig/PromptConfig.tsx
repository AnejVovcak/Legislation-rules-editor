import React, {useEffect, useState} from "react";
import {getChatBotConfig, updateChatBotConfig} from "../../api/api";
import {Button, Form, FormInput} from "semantic-ui-react";
import {ChatBotConfig} from "../../dtos/ChatBotConfig";
import SuccessToastr from "../toastrs/SuccessToastr";
import ErrorToastr from "../toastrs/ErrorToastr";

export const PromptConfig = () => {
    const [chatBotConfig, setChatBotConfig] = useState<ChatBotConfig>()
    const [promptValue, setPromptValue] = useState<string>('')
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        getChatBotConfig().then((response) => {
            setChatBotConfig(response)
            setPromptValue(response.promptValue)
        })
    }, []);

    const submit = () => {
        setSubmitted(true)
        if (promptValue === undefined) {
            return
        }

        setSuccess(false)
        setError(false)
        // Save prompt value
        updateChatBotConfig({...chatBotConfig!, promptValue: promptValue}).then(() => {
            setSubmitted(false)
            setSuccess(true)
        }).catch(() => {
            setSubmitted(false)
            setError(true)
        })
    }


    return (
        <Form>
            <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{flexDirection: 'column', display: 'flex', gap: '1rem'}}>
            <FormInput name="Prompt" label='Prompt' placeholder='Prompt' value={promptValue || ''}
                       error={(promptValue === undefined || promptValue.trim().length === 0) && submitted}
                       onChange={(e) => setPromptValue(prev => e.target.value)}/>

            <Button style={{marginLeft: 'auto'}}
                positive onClick={() => submit()} loading={submitted}>
                Save
            </Button>
            {success && <SuccessToastr content={'Saved!'}/>}
            {error && <ErrorToastr/>}
                </div>
            </div>
        </Form>
    )
}