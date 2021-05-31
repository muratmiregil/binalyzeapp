import React, { useContext} from 'react'
import { MainContext } from './context/context'
import Icon from './icon'
import Select from './Select'

export default function Step2() {

    const { csvListContent, csvListTitle, setStep, validations, setValidations } = useContext(MainContext)
    
    const regex = {
        string: (str) => str.match(/[a-z\s]+/gi),
        timestamp: (num) => num.match(/^[0-9]+$/g)
    }

    const handleChange = (key,label, e) => {
        let result = true;
        
        csvListContent.map((values, index) => {
            switch (e) {
                case 1:
                case 3:
                    if (!regex.string(values[key])) {
                        result = false;
                    }
                    break;
                case 2:
                    if (!regex.timestamp(values[key])) {
                        result = false;
                    }
                    break;
            }
        });

        setValidations([...validations.filter(({ columnKey }) => columnKey !== key), {
            columnKey: key,
            validate: result,
            selected: label
        }])
    };

    return (
        <>
            <div className="step-content">
                {csvListTitle && csvListTitle.map((title, key) => {
                    const isValid = validations.find(({ columnKey }) => columnKey === key)
                    return (
                        <div className={`box ${isValid && (isValid?.validate ? 'valid' : (isValid?.required ? 'required' : 'invalid'))}`} key={key}>
                            <div className="box-header">
                                <span className="box-title" >
                                    {isValid && (isValid?.validate ? <span className="validate"><Icon icon="check" size={8} /></span> : (isValid?.required ? '' : <span className="validate"><Icon icon="error" size={8} color='#fff' /></span>))}
                                    {title}
                                    {isValid?.required && <b>Required</b>}
                                </span>
                                <div className="select">
                                    <Select
                                        name="select"
                                        selected={isValid?.selected}
                                        onChange={(value, label, require) => handleChange(key,label,value, require)}
                                        data={[
                                            { value: 1, label: "Event Type", require: 'require' },
                                            { value: 2, label: "Date", require: 'require' },
                                            { value: 3, label: "Device Name", require: 'require' },
                                            { value: 4, label: "User Name" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="box-content">
                                {csvListContent && csvListContent.slice(0, 2).map((values, index) => (
                                    <div className="box-list-item" key={index}>
                                        <span>{index + 1}</span>
                                        {values[key]}
                                    </div>
                                ))}

                            </div>
                        </div>
                    )
                })}
                <div className="step-actions">
                    <button className="btn secondary" onClick={(e) => setStep(1)}>Geri Dön</button>
                    <button className="btn primary" disabled={validations.length === 0 || validations.filter(({ validate }) => validate === false).length > 0} onClick={(e) => setStep(3)}>Kaydet</button>
                </div>
            </div>
        </>
    )
}
