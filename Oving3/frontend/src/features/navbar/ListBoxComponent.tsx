import React from 'react';
import { VariableSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
  //renderRow based on 'react-window's virtualization of a listbox
  //Creates a clone of data on index, and styles top 
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + 6,
    },
  });
}

//Creates and uses context so elements in the virtualized list are selectable
const OuterElementContext = React.createContext({});
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
  //Listboxcomponent is a virtualized representation of a given list
  //List is treated as props (children), and it only loads a given number
  //Of components, set in height and overscancount
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;
  const itemSize = 36;

  //getHeight sets the height of the listbox-component
  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemCount * itemSize;
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          //VariableSizeList is the rendered part of the list
          itemData={itemData}
          height={getHeight()}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={() => itemSize}
          //overscanCount set to 4 to allow for fast scroll by use of arrow 
          //and simultanously minimize impact on performance
          overscanCount={4}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

export default ListboxComponent;