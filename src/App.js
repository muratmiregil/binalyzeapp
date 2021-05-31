import { useState } from "react";
import { MainContext } from './components/context/context'
import Icon from "./components/icon";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import StepTitle from "./components/StepTitle";
import { useBeforeunload } from 'react-beforeunload';

function App() {

  const requiredColumns = [0, 3]

  const [csvListContent, setCsvListContent] = useState([]);
  const [csvListTitle, setCsvListTitle] = useState([]);
  const [validations, setValidations] = useState(requiredColumns.map(column => ({columnKey: column, validate: false, required: true})))
  const [step, setStep] = useState(1)
  const [fileName, setFileName] = useState('');
  const values = { csvListContent, setCsvListContent, csvListTitle, setCsvListTitle, step, setStep, validations, setValidations,fileName,setFileName}

  useBeforeunload((event) => {
    if (step) {
      event.preventDefault();
    }
  });

  return (
    <MainContext.Provider value={values}>
      <div className={`main-wrapper ${step === 2 || step === 3 ? 'align-start' : ''}`}>
        <main>
          <section>
            <div className="section-header">
              <div className="left-bar">
               <StepTitle {...{step}} />
              </div>
              <div className="right-bar">
                <div className="steps">
                  <div className="steps-list">
                    <div className={`steps-item ${step >= 1 ? 'active' : ''} `}>
                      <span className="circle">
                        {(step > 1 ? <Icon icon="check" size={12} /> : '1')}
                        </span>
                      <span className="text">Yükle</span>
                    </div>
                    <div className={`steps-item ${step >= 2 ? 'active' : ''} `}>
                      <span className="circle">
                        {(step > 2 ? <Icon icon="check" size={12} /> : '2')}
                      </span>
                      <span className="text">Eşleştir</span>
                    </div>
                    <div className={`steps-item ${step >= 3 ? 'active' : ''} `}>
                      <span className="circle">
                        {(step > 3 ? <Icon icon="check" size={12} /> : '3')}
                      </span>
                      <span className="text">Önizle</span>
                    </div>
                    <div className={`steps-item ${step >= 4 ? 'active' : ''} `}>
                      <span className="circle">
                      {(step > 3 ? <Icon icon="check" size={12} /> : '4')}
                      </span>
                      <span className="text">Tamamla</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-content">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
            </div>
          </section>
        </main>
      </div>
    </MainContext.Provider>
  );
}

export default App;
