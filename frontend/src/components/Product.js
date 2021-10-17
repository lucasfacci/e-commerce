import { Card } from 'antd';

const { Meta } = Card;

export const Product = props => {
    return (
        <Card
            hoverable
            style={{ width: 240, height: 350 }}
            cover={<img alt={props.alt} src={props.src} />}
        >
            <b><Meta title={props.name} description={`R$${props.price}`} /></b>
        </Card>
    )
}