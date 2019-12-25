import React, { useEffect } from 'react'
import Tour from ".";
import ReactDOM from "react-dom";
import { useState } from 'react';

const steps = [
  "点击发光的地方",
  "用键盘输入你的用户名",
  "完成上一步之后点击这里",
  "用键盘输入你的密码",
  "点击这里完成登陆",
]

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    setTimeout(() => setFirstTime(true), 1000);
  }, [])

  return (
    <div className="w-screen h-screen">
      <Tour active={firstTime} text={ (() => {
        if (step === 0) return steps[0];
        if (step === 1) return steps[1];
        return "";
      })() }
       actions={{
         focus: () => setStep(1),
         input: (e: any) => {
          if (e.target.value.length === 6)
           setStep(2)
         }
       }}
      >
        <input
         placeholder="username"
         style={{ display: "block" }}
        />
      </Tour>
      <Tour active={firstTime} text={(() => {
        if (step === 2) return steps[2];
        if (step === 3) return steps[3];
        return "";
       })()}
       actions={{
        focus: () => setStep(3),
        input:(e: any) => {
          if ((e.target as HTMLInputElement).value.length === 6)
           setStep(4)
         }
       }}
      >
        <input 
        type='password'
        placeholder="password" 
        style={{ display: "block" }} 
        />
      </Tour>
      <Tour active={firstTime} text={ step === 4 ? steps[4] : "" }>
        <button style={{ display: "block" }} onClick={()=>{alert('🎉🎉，登陆成功')}}>Sign in</button>
      </Tour>
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#app'));