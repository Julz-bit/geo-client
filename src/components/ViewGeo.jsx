import {
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react'

const ViewGeo = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [form, setForm] = useState(props.info)

    return (
        <>
            <Button onClick={onOpen} colorScheme='blue' ml={2}>VIEW</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Geo Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={5}>
                            <FormControl id="ip">
                                <FormLabel>IP</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.ip} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="city">
                                <FormLabel>city</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.city} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="region">
                                <FormLabel>region</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.region} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="country">
                                <FormLabel>country</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.country} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="loc">
                                <FormLabel>loc</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.loc} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="org">
                                <FormLabel>org</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.org} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="postal">
                                <FormLabel>postal</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.postal} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="timezone">
                                <FormLabel>timezone</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.timezone} type="text" size="md" readOnly />
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewGeo;