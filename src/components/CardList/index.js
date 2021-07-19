import React from 'react';
import Card from '../Card';

const CardList = ({item = [], onDeletedItem}) => {
    return (
        <div>
            {
                item.map(({ eng, rus, id }) => (
                    <Card 
                    onDeleted={() => {
                        console.log('####: 2 level');
                        onDeletedItem(id);
                    }}
                    key={id} 
                    eng={eng} 
                    rus={rus} />
                ))
            }
        </div>
    );
};

export default CardList;