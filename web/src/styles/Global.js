import { createGlobalStyle } from 'styled-components'

import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf'
import RobotoMedium from '../assets/fonts/Roboto-Medium.ttf'
import RobotoBold from '../assets/fonts/Roboto-Bold.ttf'

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoRegular});
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoMedium});
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoBold});
        font-weight: 700;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        margin: 0;
        width: 100%;
        background-color: #F8F8F8;
        font-family: 'Roboto', sans-serif;

        button, input {
            font-family: 'Roboto', sans-serif;
        }
    }
`