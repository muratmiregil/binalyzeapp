import React, { useContext, useState } from 'react'
import { MainContext } from './context/context'
import Icon from "./icon";

export default function Step1() {

    const { csvListContent, setCsvListContent, csvListTitle, setCsvListTitle, setStep,fileName, setFileName } = useContext(MainContext)
    const [hoverUpload, setHoverUpload] = useState(false);
    const [upload, setUpload] = useState(1);


    const onDropHandle = e => {
        e.preventDefault();
        setHoverUpload(false);
        [...e.dataTransfer.files]
            .filter(file => file.type === "text/csv" && file.size < 3145728)
            .forEach((file) => {
                const reader = new FileReader();
                const fileName = file.name
                reader.onload = () => {
                    const csvData = reader.result.trim().split('\n');
                    const csvColumns = csvData
                        .shift()
                        .split(',')
                    setCsvListTitle(csvColumns)
                    setCsvListContent(csvData.map(data => data.split(',')))
                    setUpload(2);
                    setFileName(fileName);

                }
                reader.readAsText(file);
            });
    }

    return (
        <>
            <div>
                {upload === 1 && (
                    <div className={`drop-zone ${hoverUpload ? 'focus' : ''}`}
                        onDragEnter={(e) => {
                            setHoverUpload(true);
                        }}
                        onDragLeave={(e) => {
                            setHoverUpload(false);
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setHoverUpload(true);
                        }}
                        onDrop={onDropHandle}>
                        <div className="content">

                            <Icon icon="upload" size={50}></Icon>
                            <h3>Dosyanızı buraya sürükleyin</h3>
                            <p>Dosya tipi <b>.csv</b> olmalı ve maksimum <b>3 mb</b> olmalıdır</p>
                        </div>
                    </div>
                )}
                {upload === 2 && (
                    <div className="step-content">
                        <h3>Yüklemiş olduğunuz dosya detayları</h3>
                        <p>{fileName}</p>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        {csvListTitle && csvListTitle.slice(0, 4).map((title, index) => (
                                            <th key={index}>
                                                {title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {csvListContent && csvListContent.slice(0, 5).map((values, index) => (
                                        <tr key={index}>
                                            {values.slice(0, 4).map((value, index) => (
                                                <td key={index}>
                                                    <span>{value}</span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="step-actions">
                            <button className="btn secondary" onClick={(e) => setUpload(1)}>İptal</button>
                            <button className="btn primary" onClick={(e) => setStep(2)}>Yükle</button>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}
