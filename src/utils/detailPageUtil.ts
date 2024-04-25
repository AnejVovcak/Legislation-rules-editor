import {createObject, updateObject} from "../api/api";
import {SocSec} from "../dtos/socSec";
import {Tax} from "../dtos/tax";
import {Mig} from "../dtos/mig";
import {NavigateFunction} from "react-router-dom";

export async function saveObject
(id: string | undefined, data: Tax | Mig | SocSec,
 navigate: NavigateFunction,
 setSuccess: any,
 setError: any,
 collectionName: string,
 url: string) {

    try {
        if (id === "new") {
            await createObject(data, collectionName);

            setTimeout(() => {
                navigate("/" + url);
            }, 1000);
        } else if (id) {
            await updateObject(id, data, collectionName);

            setTimeout(() => {
                navigate("/" + url);
            }, 1000);
        } else {
            navigate("/" + url);
            return;
        }
        setSuccess(true);
        setError(false);
    } catch (error) {
        setError(true);
        setSuccess(false);
    }
}

export function getFormOptions(dataEnum: Record<string, string>) {
    return Object.entries(dataEnum).map(([key, value]) => {
        return {text: value, value: value, key: key}
    });
}

export function handleSubmit<T>(data: Mig | SocSec | Tax,
                                      setData: React.Dispatch<React.SetStateAction<T>>,
                                      id: string | undefined,
                                      navigate: NavigateFunction,
                                      setSuccess: any,
                                      setError: any,
                                      collectionName: string,
                                      url: string) {
    const content = data.content;
    const regex = /<a href="\[info\](.*?)">(.*?)<\/a>/g;
    const subst = `<span class="tooltip">$2<span class="tooltip-content">$1</span></span>`;
    const newContent = content.replace(regex, subst);
    console.log(newContent)
    setData(prev => ({...prev, content: newContent}));
    saveObject(id, data, navigate, setSuccess, setError, collectionName, url)
}