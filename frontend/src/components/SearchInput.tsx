import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import usePropertyQueryStore from '../store'

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = usePropertyQueryStore(s => s.setSearchText);
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (ref.current) setSearchText(ref.current.value);
    }}>
      <Text>Search</Text>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input ref={ref} borderRadius={5} placeholder="Search properties..." />
      </InputGroup>
    </form>
  )
}

export default SearchInput