import { create } from "zustand";
import { FilterSettings } from "./components/PropertyFilter";

interface PropertyQuery {
  propertyTypeId?: number | undefined;
  filterSettings: FilterSettings;
  sortOrder?: string;
  searchText?: string;
}

interface PropertyQueryStore {
  propertyQuery: PropertyQuery;
  setSearchText: (searchText: string) => void;
  setPropertyTypeId: (propertyTypeId: number | undefined) => void;
  setFilterSettings: (filterSettings: FilterSettings) => void;
  sortOrder: (sortOrder: string) => void;
}

const usePropertyQueryStore = create<PropertyQueryStore>(set => ({
  propertyQuery: {
    filterSettings: {
      min_bedrooms: '',
      max_bedrooms: '',
      min_bathrooms: '',
      max_bathrooms: ''
    }
  },
  setSearchText: (searchText) => set(store => ({ propertyQuery: { ...store.propertyQuery, searchText }})),
  setPropertyTypeId: (propertyTypeId) => set(store => ({ propertyQuery: { ...store.propertyQuery, propertyTypeId }})),
  setFilterSettings: (filterSettings) => set(store => ({ propertyQuery: { ...store.propertyQuery, filterSettings }})),
  sortOrder: (sortOrder) => set(store => ({ propertyQuery: { ...store.propertyQuery, sortOrder }})),
}));

export default usePropertyQueryStore;