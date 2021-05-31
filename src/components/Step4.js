import React, { useContext } from 'react'
import { MainContext } from './context/context'
import Icon from "./icon";

export default function Step4() {
    const { fileName } = useContext(MainContext)
    return (
        <>
            <div className="step-content align-center padding">
                <div className="icon">
                <Icon icon="success-final" size={50} />
                </div>
                <h3>İşleminiz Tamamlanmıştır.</h3>
                <p>{fileName}</p>
                <div className="step-actions">
                    <button className="btn secondary">İptal</button>
                    <button className="btn primary" >Çıkış</button>
                </div>
            </div>
        </>
    )
}
