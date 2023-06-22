import React, {useEffect, useRef, useState} from 'react';
import {IMaskInput} from 'react-imask';


const DrawErrors = (errors) => {

    return (
        <div>
            {errors.errors.map(error => {
                if (typeof error === "string") {
                    return <p key={error} className={"h2-contacts input__error"}>{error}</p>
                }
            })}
        </div>
    )
}

const OrderForm = () => {
    const useValidation = (value, validations) => {
        const [isEmpty, setIsEmpty] = useState(true)
        const [minLengthError, setMinLengthError] = useState(false)
        const [emailError, setEmailError] = useState(false)
        const [phoneError, setPhoneError] = useState(false)

        useEffect(() => {
            for (const validation in validations) {
                switch (validation) {
                    case 'isEmpty':
                        if (value.length > 0) {
                            setIsEmpty(false)
                        } else {
                            setIsEmpty(validations[validation]) // При ошибке мы возвращаем не факт ошибки, а текст ошибки
                        }
                        break
                    case "minLength":
                        if (value.length < validations[validation].value) {
                            setMinLengthError(validations[validation].error)
                        } else {
                            setMinLengthError(false)
                        }
                        break
                    case "email":
                        if (!value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
                        )) {
                            setEmailError("E-mail некорректен")
                        } else {
                            setEmailError(false)
                        }
                        break
                    case "phone":
                        if (value.length !== 11) {
                            setPhoneError("Необходимо указать номер телефона")
                        } else {
                            setPhoneError(false)
                        }
                }
            }
        }, [value])

        return {
            isEmpty,
            minLengthError,
            emailError,
            phoneError
        }
    }

    const useInput = (initialValue, name, validations) => {
        const [value, setValue] = useState(initialValue)
        const [isDirty, setIsDirty] = useState(false)
        const valid = useValidation(value, validations)
        const onBlur = (e) => {
            setIsDirty(true)
        }

        const onChange = (value) => {
            setValue(value)
        }

        const validationErrors = Object.values(valid).filter(error => {
            if (typeof error === "string" && isDirty) {
                return (
                    error
                )
            }
        })

        return {
            value,
            onBlur,
            onChange,
            isDirty,
            validationErrors,
            name
        }
    }
    const [buttonDisabled, setButtonDisabled] = useState(true)


    const name = useInput("",
        "Имя",
        {
            isEmpty: "Имя не должно быть пустым",
            minLength: {
                value: 2,
                error: "Имя слишком короткое"
            }
        })

    const email = useInput("",
        "E-mail",
        {
            isEmpty: "Необходимо указать почту",
            email: true,
        })

    const phone = useInput("",
        "Телефон",
        {
            phone: true,
        })

    const message = useInput("",
        "Сообщение",
        {
            isEmpty: "Напишите что-нибудь"
        })


    const ref = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        if (!name.validationErrors.length && name.isDirty &&
            !phone.validationErrors.length && phone.isDirty &&
            !email.validationErrors.length && email.isDirty &&
            !message.validationErrors.length && message.isDirty) {
            setButtonDisabled(false)
        } else setButtonDisabled(true)

        //чтобы + нужно: isDirty True и !name.validationErrors.length True

    }, [name, phone, email])

    return (
        <div className={"form"}>
            {/*{name.error*/}
            {/*? <span className={"form-font input__error"}>{"Имя " + name.error}</span>*/}
            {/*: <span className={"input__title form-font"}>Имя</span>*/}
            {/*}*/}

            <div className={"form__section"}>
                <p className={"form-font"}>{phone.name}</p>
                <IMaskInput
                    className={"h2-contacts form__input"}
                    mask={'+{7} (000) 000-00-00'}
                    radix="."
                    lazy={false}
                    unmask={true}
                    type="text"
                    // unmask={true} // true|false|'typed'
                    ref={ref}
                    inputRef={inputRef}  // access to nested input
                    // DO NOT USE onChange TO HANDLE CHANGES!
                    // USE onAccept INSTEAD
                    onAccept={
                        // depending on prop above first argument is
                        // `value` if `unmask=false`,
                        // `unmaskedValue` if `unmask=true`,
                        // `typedValue` if `unmask='typed'`
                        (unmaskedValue, mask) => {
                            // console.log(unmaskedValue)
                            phone.onChange(unmaskedValue)
                        }
                    }
                    onComplete={
                        (unmaskedValue) => {
                            // console.log(unmaskedValue)
                            // phone.onBlur(unmaskedValue)
                        }
                    }
                    onBlur={phone.onBlur}
                />
                <DrawErrors errors={phone.validationErrors}/>
            </div>

            <div className={"form__section"}>
                <p className={"form-font"}>{name.name}</p>
                <input
                    className={"h2-contacts form__input"}
                    type="text"
                    onChange={e => name.onChange(e.target.value)}
                    onBlur={name.onBlur}
                />
                <DrawErrors errors={name.validationErrors}/>
            </div>

            <div className={"form__section"}>
                <p className={"form-font"}>{email.name}</p>
                <input
                    className={"h2-contacts form__input"}
                    type="text"
                    onChange={e => email.onChange(e.target.value)}
                    onBlur={email.onBlur}
                />
                <DrawErrors errors={email.validationErrors}/>
            </div>

            <div className={"form__section"}>
                <p className={"form-font"}>{message.name}</p>
                <textarea
                    className={"h2-contacts form__input form__textarea"}
                    onChange={e => message.onChange(e.target.value)}
                    onBlur={message.onBlur}
                    rows="5"
                />
                <DrawErrors errors={message.validationErrors}/>
            </div>

            <button
                disabled={buttonDisabled}
                type={"submit"}
                className={"btn-font--contacts btn btn--contacts"}
            >Отправить заявку
            </button>
        </div>
    );
};

export default OrderForm;