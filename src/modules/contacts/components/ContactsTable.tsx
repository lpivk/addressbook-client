import { useTable, useSortBy, usePagination, Column } from 'react-table';
import {
  Button,
  Icon,
  HStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  VStack,
  Text,
  Select,
  Skeleton,
  Flex,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoTrashOutline,
  IoPencilOutline,
  IoStarOutline,
  IoStar,
} from 'react-icons/io5';

import { DeleteContactModal } from './DeleteContactModal';

import { Contact, Styles } from '../../../shared/types';
import { Colors } from '../../../shared/assets/colors';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { contactApi } from '../service/api';
import { AxiosError } from 'axios';
import { EditContactModel } from './EditContactModel';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Surname',
    accessor: 'surname',
  },
  {
    Header: 'E-Mail',
    accessor: 'email',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone',
  },
  {
    Header: 'Actions',
  },
] as Column<Contact>[];

interface ContactsTableProps {
  data: Contact[];
  isLoading: boolean;
  refresh: () => void;
}

export const ContactsTable: React.FC<ContactsTableProps> = ({
  data,
  isLoading,
  refresh,
}) => {
  const {
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useSortBy,
    usePagination
  );

  const {
    isOpen: isOpenDeleteContactModal,
    onOpen: handleOpenDeleteContactModal,
    onClose: handleCloseDeleteContactModal,
  } = useDisclosure();
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);

  const {
    isOpen: isOpenEditContactModal,
    onOpen: handleOpenEditContactModal,
    onClose: handleCloseEditContactModal,
  } = useDisclosure();
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const toast = useToast();
  const { mutate: favoriteRequest } = useMutation(contactApi.favoriteContact, {
    onSuccess: (message) => {
      toast({
        status: 'success',
        title: 'Success',
        description: message,
        isClosable: true,
      });
      refresh();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        status: 'error',
        title: 'Error',
        description: error.response?.data
          ? error.response?.data.message
          : error.message,
        isClosable: true,
      });
    },
  });
  const { mutate: unfavoriteRequest } = useMutation(
    contactApi.unfavoriteContact,
    {
      onSuccess: (message) => {
        toast({
          status: 'success',
          title: 'Success',
          description: message,
          isClosable: true,
        });
        refresh();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast({
          status: 'error',
          title: 'Error',
          description: error.response?.data
            ? error.response?.data.message
            : error.message,
          isClosable: true,
        });
      },
    }
  );

  return (
    <>
      <VStack sx={styles.tableContainer}>
        <Table>
          <Thead sx={styles.thead}>
            {headerGroups.map((headerGroup, index) => (
              <Tr key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    sx={styles.th}
                  >
                    <Flex>
                      <Text>{column.render('Header')}</Text>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon
                            as={IoChevronUpOutline}
                            color={Colors.purple[400]}
                            sx={styles.chevron}
                            data-testid='chevronUp'
                          ></Icon>
                        ) : (
                          <Icon
                            as={IoChevronDownOutline}
                            color={Colors.purple[400]}
                            sx={styles.chevron}
                            data-testid='chevronDown'
                          ></Icon>
                        )
                      ) : (
                        <></>
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr key={index} sx={styles.tr}>
                  {row.cells.map((cell, index) => {
                    if (index < 4)
                      return (
                        <Td key={index} sx={styles.td}>
                          <Skeleton
                            isLoaded={!isLoading}
                            startColor={Colors.purple[100]}
                            endColor={Colors.mint[200]}
                            sx={styles.skeleton}
                          >
                            <Text>{cell.value}</Text>
                          </Skeleton>
                        </Td>
                      );
                    return (
                      <Td w={'150px'} py={'0px'} key={index}>
                        <HStack>
                          {row.original.isFavorite ? (
                            <IconButton
                              h={'30px'}
                              bg='white'
                              _hover={{ bg: Colors.purple[50] }}
                              icon={<IoStar color={Colors.purple[600]} />}
                              aria-label={'favorite'}
                              onClick={() =>
                                unfavoriteRequest(row.original._id)
                              }
                            />
                          ) : (
                            <IconButton
                              h={'30px'}
                              bg='white'
                              _hover={{ bg: Colors.purple[50] }}
                              icon={
                                <IoStarOutline color={Colors.purple[600]} />
                              }
                              aria-label={'unfavorite'}
                              onClick={() => favoriteRequest(row.original._id)}
                            />
                          )}
                          <IconButton
                            h={'30px'}
                            bg='white'
                            _hover={{ bg: Colors.purple[50] }}
                            icon={
                              <IoPencilOutline color={Colors.purple[600]} />
                            }
                            aria-label={'edit'}
                            onClick={() => {
                              setEditContact(row.original);
                              handleOpenEditContactModal();
                            }}
                          />
                          <IconButton
                            h={'30px'}
                            bg='white'
                            _hover={{ bg: Colors.purple[50] }}
                            icon={<IoTrashOutline color={Colors.purple[600]} />}
                            aria-label={'delete'}
                            onClick={() => {
                              setDeleteContact(row.original);
                              handleOpenDeleteContactModal();
                            }}
                          />
                        </HStack>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <HStack sx={styles.pagination}>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            sx={styles.selectInput}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} per page
              </option>
            ))}
          </Select>
          <Button
            onClick={() => gotoPage(0)}
            sx={
              pageIndex == 0
                ? styles.paginationButtonActive
                : styles.paginationButton
            }
          >
            1
          </Button>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            sx={styles.paginationButton}
          >{`<`}</Button>
          {pageIndex > 0 && pageIndex < pageCount - 1 ? (
            <Button sx={styles.paginationButtonActive} color={Colors.mint[700]}>
              {pageIndex + 1}
            </Button>
          ) : (
            <></>
          )}
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            sx={styles.paginationButton}
          >{`>`}</Button>
          {pageCount > 1 && (
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              sx={
                pageIndex == pageCount - 1
                  ? styles.paginationButtonActive
                  : styles.paginationButton
              }
            >
              {pageCount}
            </Button>
          )}
        </HStack>
      </VStack>
      {deleteContact != null && (
        <DeleteContactModal
          isOpen={isOpenDeleteContactModal}
          onClose={handleCloseDeleteContactModal}
          contact={deleteContact}
          refresh={refresh}
        />
      )}
      {editContact != null && (
        <EditContactModel
          isOpen={isOpenEditContactModal}
          onClose={handleCloseEditContactModal}
          contact={editContact}
          refresh={refresh}
        />
      )}
    </>
  );
};

const styles: Styles = {
  tableContainer: {
    width: '100%',
    marginBottom: '20px',
  },
  thead: {
    // position: 'sticky',
    // top: '210px',
    height: '40px',
    backgroundColor: Colors.gray[100],
  },
  tr: {
    height: '40px',
  },
  td: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  chevron: {
    height: '16px',
    width: '16px',
  },
  selectInput: {
    borderRadius: '4px',
  },
  pagination: {
    alignSelf: 'flex-end',
  },
  paginationButton: {
    color: Colors.gray[400],
    background: Colors.white,
    border: `1px solid ${Colors.gray[200]}`,
    borderRadius: '4px',
  },
  paginationButtonActive: {
    color: Colors.teal[500],
    background: Colors.white,
    border: `1px solid ${Colors.gray[200]}`,
    borderRadius: '4px',
  },
  skeleton: {
    height: '20px',
    width: '100%',
  },
};
