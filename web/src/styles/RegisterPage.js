import styled from 'styled-components'

export default styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: block;

    .contentWrapper {
        padding: 0 80px 80px;
        
        >div {
            margin-left: auto;
            width: 45%;
            max-width: 670px;

            @media only screen and (max-width: 1200px) {
                width: 50%;
            }

            @media only screen and (max-width: 900px) {
                max-width: 100%;
                width: 100%;
            }
        }

        @media only screen and (max-width: 580px) {
            padding: 0 30px 30px;
        }
    }

    .land {
        width: 100%;
        height: auto;
        object-fit: contain;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -3;
    }

    .castle {
        position: absolute;
        max-width: 44%;
        height: auto;
        display: block;
        object-fit: contain;
        left: 0;
        bottom: 0;
        z-index: -2;
    }

    .knight {
        max-width: 30%;
        position: absolute;
        bottom: 0;
        left: 22%;
        transform: translateX(-50%);
        object-fit: contain;
        height: auto;
        display: block;
        z-index: -1;
    }

    @media only screen and (max-width: 900px) {
        .castle {
            max-width: 80%;
            left: 50%;
            transform: translateX(-50%);
        }

        .knight {
            display: none;
        }
    }

    @media only screen and (max-width: 580px) {
        .castle {
            display: none;
        }
    }
`