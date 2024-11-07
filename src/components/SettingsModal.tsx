import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from '@nextui-org/react';
import settingsService from '@/services/settingsService';
import util from '@/utils/util';

const SettingsModal: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [settings, setSettings] = useState<Map<string, string>>(new Map());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const keys = ['smartseeds.username', 'smartseeds.password'];

    useEffect(() => {
        if (isOpen) {
            fetchSettings();
        }
    }, [isOpen]);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const settingsMap = await settingsService.getSettings(keys);
            setSettings(settingsMap);
        } catch (error) {
            setError('Failed to fetch settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings((prev) => new Map(prev.set(key, value)));
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await settingsService.updateSettings(
                Array.from(settings).map(([key, value]) => ({ key, value }))
            );
        } catch (error) {
            setError('Failed to save settings');
        } finally {
            setIsLoading(false);
        }
    };

    const sortedSettings = util.sortMap(settings, keys);

    return (
        <div className="m-2">
            <Button onClick={onOpen} color="primary" className="max-w-fit">
                Изменить данные
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Изменить данные
                            </ModalHeader>
                            <ModalBody>
                                {sortedSettings.map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-4">
                                        <Input
                                            value={value}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            label={key}
                                            fullWidth
                                        />
                                    </div>
                                ))}
                                {error && <div className="text-red-500">{error}</div>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    Отменить
                                </Button>
                                <Button color="primary" isLoading={isLoading} onClick={handleSave}>
                                    Сохранить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SettingsModal;
