import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllCategories } from '@/lib/actions/product.action'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = async () => {
    const categories = await getAllCategories()
  return (
    <form 
        action={"/search"}
        method='GET'
    >
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Select name='category'>
                <SelectTrigger
                 className='w-[180px]'
                >
                    <SelectValue placeholder="All"/>
                </SelectTrigger>
                <SelectContent >
                    <SelectItem 
                        key={'all'}
                        value='all'
                    >
                        All
                    </SelectItem>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.category}
                            value={category.category}
                        >
                            {category.category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input 
                name='q'
                placeholder='Search'
                className='md:w-[100px] lg:w-[300px]'
                type='text'
            />

            <Button>
                <SearchIcon />
            </Button>
        </div>
    </form>
  )
}

export default Search