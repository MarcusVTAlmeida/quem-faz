export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }) => {
    const paginationRange = useMemo(() => {
       // Nossa lógica de implementação vai aqui 
        
    }, [totalCount, pageSize, siblingCount, currentPage]);
  
    return paginationRange;
  };