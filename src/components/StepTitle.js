import React from 'react'
import Icon from "./icon";

export default function StepTitle({ step }) {
    return (
        <>
             {step === 1 && (
                  <div className="title">
                    <div className="icon">
                      <Icon icon="add" size={40} />
                    </div>
                    <div className="content">
                      <h2>Bir dosya seçin</h2>
                      <p>Mevcut dosyanızı yükleyin ve kontrol edin</p>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="title">
                    <div className="icon">
                      <Icon icon="match" size={40} />
                    </div>
                    <div className="content">
                      <h2>Kolonları Eşleyin</h2>
                      <p>Seçili kolonları eşleştirin</p>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="title">
                    <div className="icon">
                      <Icon icon="preview" size={40} />
                    </div>
                    <div className="content">
                      <h2>Önizleme</h2>
                      <p>Eşlenmiş kolonları görüntüleyin</p>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="title">
                    <div className="icon">
                      <Icon icon="success" size={40} />
                    </div>
                    <div className="content">
                      <h2>İşlem Başarılı</h2>
                      <p>İşleminiz başarılıyla gerçekleşti</p>
                    </div>
                  </div>
                )}
        </>
    )
}
