import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 35px;
    color: #fff;
    max-width: 450px;
    line-height: 56px;
    margin-top: 15px;
    margin-left: 600px;

    a {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #fff;
        transition: 0.2s;

        &:hover {
            color: #cc0000;
        }
    }
`;

export const Backbox = styled.div`
    padding-right: 20px;
    padding-left: 20px;
    padding: 30px;
    margin-top: 30px;
    background-color: #fff;
    opacity: 0.9;
    border: solid #000000;
    border-radius: 5px 5px 5px 5px;
    strong {
        margin: 10px;
        font-size: 15px;
        color: #ff0000;
    }
    p {
        margin: 12px;
        font-size: 12px;
        color: #000000;
    }
    ul {
        li {
            margin: 12px;
            font-size: 12px;
            color: #000000;
        }
    }
`;

export const Subtitle = styled.h1`
    padding: 30px;
    text-align: center;
    font-size: 18px;
    color: #ff0000;
`;
