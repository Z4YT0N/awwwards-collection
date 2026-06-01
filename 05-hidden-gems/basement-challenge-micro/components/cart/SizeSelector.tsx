import { Option, Product } from '@/product/types';
import { useStore } from '@/state/Store';
import { styled } from '@/stitches.config';
import * as RadioGroup from '@radix-ui/react-radio-group';

const StyledRoot = styled(RadioGroup.Root, {
    display: 'flex',
    marginLeft: 4,

    '@sm2': {
        marginLeft: 8
    }
});

const StyledItem = styled(RadioGroup.Item, {
    all: 'unset',
    padding: '5px 10px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 99,
    marginLeft: 2,
    fontSize: '0.75rem',
    '&[data-state="checked"]': {
        boxShadow: '0 0 0 1px white'
    },
    '&:focus': {}
});

const Root = StyledRoot;
const Item = StyledItem;

const SizeSelector: React.FC<{
    product: Product;
    size: string;
    option: Option;
}> = ({ product, size, option }) => {
    const { setProductSize } = useStore();

    return (
        <Root
            defaultValue={option.values[0]}
            value={size}
            onValueChange={(newValue) => setProductSize(product, newValue)}>
            {option.values.map((value) => (
                <Item key={'opt' + value} value={value}>
                    {value}
                </Item>
            ))}
        </Root>
    );
};

export default SizeSelector;
