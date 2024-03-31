import {createObject, updateObject} from "../api/api";
import {SocSec} from "../dtos/socSec";
import {Tax} from "../dtos/tax";
import {Mig} from "../dtos/mig";
import {NavigateFunction} from "react-router-dom";

export async function performAction
(id: string|undefined, data: Tax | Mig | SocSec,
 navigate: NavigateFunction,
 setSuccess: any,
 setError: any,
 collectionName: string,
 url: string) {

    try {
        if (id === "new") {
            await createObject(data, collectionName);
        } else if (id) {
            await updateObject(id, data, collectionName);

            //wait for 2 seconds before navigating (make sure that navigation is set to root)
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