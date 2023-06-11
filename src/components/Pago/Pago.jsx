import React, { useEffect } from 'react';
import StylePago from './StylePago';
const Pago = () => {
    useEffect(() => {
        document.querySelector(".card-number-input").oninput = () => {
          document.querySelector(".card-number-box").innerText = document.querySelector(
            ".card-number-input"
          ).value;
        };
    
        document.querySelector(".card-holder-input").oninput = () => {
          document.querySelector(
            ".card-holder-name"
          ).innerText = document.querySelector(".card-holder-input").value;
        };
    
        document.querySelector(".month-input").oninput = () => {
          document.querySelector(".exp-month").innerText =document.querySelector(
            ".month-input"
          ).value;
        };
    
        document.querySelector(".year-input").oninput = () => {
          document.querySelector(".exp-year").innerText =" / "+  document.querySelector(
            ".year-input"
          ).value;
        };
    
        document.querySelector(".cvv-input").onmouseenter = () => {
          document.querySelector(".front").style.transform =
            "perspective(1000px) rotateY(-180deg)";
          document.querySelector(".back").style.transform =
            "perspective(1000px) rotateY(0deg)";
        };
    
        document.querySelector(".cvv-input").onmouseleave = () => {
          document.querySelector(".front").style.transform =
            "perspective(1000px) rotateY(0deg)";
          document.querySelector(".back").style.transform =
            "perspective(1000px) rotateY(180deg)";
        };
    
        document.querySelector(".cvv-input").oninput = () => {
          document.querySelector(".cvv-box").innerText = document.querySelector(
            ".cvv-input"
          ).value;
        };
      }, []);
    return (
        
        
        <body>
            <style>{StylePago}</style>

            <div class="container">

                <div class="card-container">

                    <div class="front">
                        <div class="image">
                            <img src="https://purepng.com/public/uploads/large/google-stadia-logo-3cx.png" class="bank-logo" alt=""></img>
                                <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-2.png" alt=""></img>
                                </div>
                                <div class="card-number-box">################</div>
                                <div class="flexbox">
                                    <div class="box">
                                        <span>TITULAR DE LA TARJETA</span>
                                        <div class="card-holder-name">NOMBRE COMPLETO</div>
                                    </div>
                                    <div class="box">
                                        <span>CADUCIDAD</span>
                                        <div class="expiration">
                                            <span class="exp-month">MM</span>
                                            <span class="exp-year">YY</span>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div class="back">
                            <div class="stripe"></div>
                            <div class="box">
                                <span>cvv</span>
                                <div class="cvv-box"></div>
                                <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-2.png" alt=""></img>
                            </div>
                        </div>

                    </div>

                    <form action="">
                        <div class="inputBox">
                            <span>NUMERO DE TARJETA</span>
                            <input type="text" maxlength="16" class="card-number-input"></input>
                        </div>
                        <div class="inputBox">
                            <span>TITULAR DE LA TARJETA</span>
                            <input type="text" class="card-holder-input"></input>
                        </div>
                        <div class="flexbox">
                            <div class="inputBox">
                                <span>MES</span>
                                <select name="" id="" class="month-input">
                                    <option value="month" selected disabled>MM</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div class="inputBox">
                                <span>AÑO</span>
                                <select name="" id="" class="year-input">
                                    <option value="year" selected disabled>YY</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>

                                </select>
                            </div>
                            <div class="inputBox">
                                <span>cvv</span>
                                <input type="text" maxlength="4" class="cvv-input"></input>
                            </div>
                        </div>
                        <input type="submit" value="submit" class="submit-btn"></input>
                    </form>

                </div>



        </body>

    );
}

export default Pago;