import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    return (   
    <div className = 'center'>
        <h1>{ productId }</h1>
        <form onSubmit={ () => navigate('/bazaar') }>
            <div className = 'txt'>
                <strong>WIP</strong>
            </div>
            <button type='submit'>Go Back</button>
        </form>
    </div>);
}

export default Product;
