import Box from '@/components/commons/Box';
import { Product } from '@/product/types';
import { styled } from '@/stitches.config';
import { useStore } from '@/state/Store';

const StyledButton = styled('button', {
    all: 'unset',
    color: 'white',
    paddingX: 6
});

const QuantityControl: React.FC<{
    product: Product;
    quantity: number;
}> = ({ product, quantity }) => {
    const { removeFromCart, incrementQuantity, decrementQuantity } = useStore();

    return (
        <Box
            css={{
                display: 'flex',
                padding: 4,
                border: '1px solid white',
                borderRadius: 32,
                marginLeft: 12
            }}>
            <StyledButton onClick={() => (quantity === 1 ? removeFromCart(product) : decrementQuantity(product))}>
                -
            </StyledButton>
            <span>{quantity}</span>
            <StyledButton onClick={() => incrementQuantity(product)}>+</StyledButton>
        </Box>
    );
};

export default QuantityControl;
