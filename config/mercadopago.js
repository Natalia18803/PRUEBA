import mercadopago from 'mercadopago';

export const configureMercadoPago = () => {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
        console.error('MERCADOPAGO_ACCESS_TOKEN no definido');
    } else {
        mercadopago.configure({ access_token: accessToken });
    }
    return mercadopago;
};

export { mercadopago };
