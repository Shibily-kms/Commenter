import React from 'react'
import './nulldefault.scss'



function NullPost(props) {
    return (
        <div>
            <div className="nullPost">
                <div className="boader">
                    {props.icon ?
                        <div className="icon">
                            {props.icon}
                        </div> : ''
                    }
                    <div className="text">
                        {props.header ?
                            <h4>{props.header}</h4>
                            : ""
                        }
                        {props?.desc ?
                            <p>{props.desc}</p>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NullPost