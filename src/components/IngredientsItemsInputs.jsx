import React, { useContext } from 'react'
import { InputsContext } from '../providers/IngredientsInputsProvider';

const IngredientsItemsInputs = ({ food }) => {

    // console.log(food.ingredients, foodId);

    const {
        selectedIngredientsItems, setSelectedIngredientsItems
    } = useContext(InputsContext);

    const addToSelectedIngredientsItems = (id, index) => {
        const newArray = [...selectedIngredientsItems];
        let isExist = false, existsId;
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id == id) {
                isExist = true;
                existsId = i;
                break;
            }
        }

        if (!isExist) {
            newArray[newArray.length] = food.ingredients[index];
        } else {
            for (let i = existsId; i < newArray.length - 1; i++) {
                newArray[i] = newArray[i + 1];
            }
            newArray.length -= 1;
        }

        setSelectedIngredientsItems(newArray);
    }

    return <div className='flex justify-evenly w-full '>
        {
            food.ingredients.map((item, index) => <div key={item.id} className='flex flex-col gap-4'>
                <h2 className='font-semibold'> {item.ingredientCategory.name} </h2>
                <div className='flex-items gap-5'>
                    <input onChange={() => addToSelectedIngredientsItems(item.id, index)}
                        id='input1' type='checkbox' disabled={!item.isInStock} />
                    <label htmlFor='input1'> {item.name} </label>
                </div>
            </div>)
        }
    </div>
}

export default IngredientsItemsInputs