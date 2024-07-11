import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Flex,
    Spinner,
    Container,
    Input,
    Button,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGeoInfo, addGeoInfo, resetTransaction } from '../store/slices/geoInfoSlice'
import ViewGeo from '../components/ViewGeo'

const Home = () => {
    const toast = useToast()
    const dispatch = useDispatch()
    const { geoInfos, status, transaction, error } = useSelector(state => state.geoInfo)

    const [ipAdd, setIpAdd] = useState('')

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGeoInfo())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (transaction === 'success') {
            setIpAdd('')
            toast({
                title: "IP Address added successfully.",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            dispatch(resetTransaction())
        } else if (transaction === 'failed') {
            toast({
                title: `${error}`,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            dispatch(resetTransaction())
        }
    })

    const handleSubmit = () => {
        dispatch(addGeoInfo(ipAdd));
    };

    if (status === 'loading') {
        return <Spinner />
    }

    return (
        <>
            <Container maxW="full" centerContent overflow="hidden">
                <Box maxW="100%" overflowX="auto" textAlign="center">
                    <Flex align="center" mb={4} mt={4}>
                        <Input
                            value={ipAdd}
                            type="text"
                            borderColor={'blue'}
                            placeholder='ENTER IP ADDRESS'
                            onChange={(e) => setIpAdd(e.target.value)}
                        />
                        <Button variant='ghost' onClick={handleSubmit} color={'blue'}>Save</Button>
                    </Flex>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>IP</Th>
                                    <Th>CITY</Th>
                                    <Th>REGION</Th>
                                    <Th>COUNTRY</Th>
                                    <Th>LOC</Th>
                                    <Th>ORG</Th>
                                    <Th>POSTAL</Th>
                                    <Th>TIMEZONE</Th>
                                    <Th>View</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {geoInfos.map((info) => (
                                    <Tr key={info.id}>
                                        <Td>{info.ip}</Td>
                                        <Td>{info.city}</Td>
                                        <Td>{info.region}</Td>
                                        <Td>{info.country}</Td>
                                        <Td>{info.loc}</Td>
                                        <Td>{info.org}</Td>
                                        <Td>{info.postal}</Td>
                                        <Td>{info.timezone}</Td>
                                        <Td><ViewGeo info={info} /></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer >
                </Box>
            </Container>
        </>
    )
}

export default Home;