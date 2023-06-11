import React from 'react';
const Cards = () => {
    

    return (

        <div className='cartas'id="cartas">
            <article className="card">
                <div className="card__inner">
                    <div className="card__body card__body--front">
                        <h2 className="card__title">Escenario 1</h2>
                    </div>
                    <div className="card__body card__body--back">
                        <h2 className="card__title">BACK SIDE</h2>
                    </div>
                </div>
            </article>


            <article className="card">
                <div className="card__inner">
                    <div className="card__body card__body--front">
                        <h2 className="card__title">Escenario 2</h2>
                    </div>
                    <div className="card__body card__body--back">
                        <h2 className="card__title">BACK SIDE</h2>
                    </div>
                </div>
            </article>

            <article className="card">
                <div className="card__inner">
                    <div className="card__body card__body--front">
                        <h2 className="card__title">Escenario 3</h2>
                    </div>
                    <div className="card__body card__body--back">
                        <h2 class="card__title">BACK SIDE</h2>
                    </div>
                </div>
            </article>
        </div>


    );
}

export default Cards;