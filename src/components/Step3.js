import React, { useContext } from 'react'
import { MainContext } from './context/context'

export default function Step2() {

    const { csvListTitle, csvListContent, setStep, validations } = useContext(MainContext)

    return (
        <>
            <div className="step-content">
                <div className="step-scroll">
                    <div className="table border">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: '20px'}}></th>
                                    {validations.filter(({ validate }) => validate === true).map(({ columnKey, validate }) => {
                                        const column = csvListTitle.find((column, key) => key === columnKey)
                                        return (
                                            <th key={columnKey}>
                                                {column}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {
                                            csvListContent && csvListContent.map((values, index) => (
                                                <span key={index}>
                                                    <span className="circle">{index + 1}</span>
                                                </span>
                                            ))
                                        }
                                    </td>
                                    {validations.filter(({ validate }) => validate === true).map(({ columnKey, validate }) => (
                                        <td key={columnKey}>
                                            {
                                                csvListContent && csvListContent.map((values, index) => (
                                                    <span key={index}>
                                                        {values[columnKey]}
                                                    </span>
                                                ))
                                            }
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="step-actions">
                    <button className="btn secondary" onClick={(e) => setStep(2)}>Geri Dön</button>
                    <button className="btn primary" onClick={(e) => setStep(4)}>Tamamla</button>
                </div>
            </div>
        </>
    )
}
