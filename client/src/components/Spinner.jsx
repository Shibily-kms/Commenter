import React from 'react'
import { ImSpinner3 } from "@react-icons/all-files/im/ImSpinner3";
import './spinner.scss'

function Spinner() {
  return (
    <div>
        <div className="spinner">
            <div className="icon">
                <ImSpinner3/>
            </div>
        </div>
    </div>
  )
}

export default Spinner