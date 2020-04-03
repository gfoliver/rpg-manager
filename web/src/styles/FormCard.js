import styled from 'styled-components'

export default styled.div`
    border-radius: 8px;
    padding: 50px 30px;
    background: #fff;
    box-shadow: 16px 16px 40px rgba(55, 104, 132, 0.05);
    color: #000;
    width: 35%;
    max-width: 500px;

    @media only screen and (max-width: 1200px) {
        width: 50%;
    }

    @media only screen and (max-width: 900px) {
        max-width: 100%;
        width: 100%;
    }

    h1 {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 50px;
    }

    .inputGroup {
        margin-bottom: 30px;

        label {
            display: block;
            width: 100%;
            font-size: 20px;
            margin-bottom: 5px;
        }

        input {
            width: 100%;
            border: none;
            background: #F4F4F4;
            border-radius: 8px;
            padding: 20px;
            font-size: 18px;

            &:active,
            &:focus {
                outline: none;
                box-shadow: none;
            }
        }
    }

    button[type="submit"] {
        margin-bottom: 30px;
    }

    a, span {
        color: #000;
        font-size: 18px;
        text-decoration: none;
    }

    @media only screen and (max-width: 580px) {
        h1 {
            margin-bottom: 30px;
        }

        .inputGroup {
            label {
                font-size: 18px;
            }

            input {
                font-size: 14px;
                padding: 15px;
            }
        }

        a, span {
            font-size: 14px;
        }
    }
`