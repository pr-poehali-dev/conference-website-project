import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type UserRole = 'admin' | 'operator';

type Participant = {
  id: string;
  name: string;
  email: string;
  organization: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
};

type Abstract = {
  id: string;
  title: string;
  author: string;
  email: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
};

const Admin = () => {
  const [currentRole] = useState<UserRole>('admin');
  const [emailTemplate, setEmailTemplate] = useState({
    subject: '',
    body: '',
    recipientType: 'all'
  });

  const [participants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Иванов Иван Иванович',
      email: 'ivanov@example.com',
      organization: 'МГУ',
      type: 'Докладчик',
      status: 'approved',
      registeredAt: '2024-12-10'
    },
    {
      id: '2',
      name: 'Петрова Мария Сергеевна',
      email: 'petrova@example.com',
      organization: 'СПбГУ',
      type: 'Слушатель',
      status: 'pending',
      registeredAt: '2024-12-11'
    },
    {
      id: '3',
      name: 'Сидоров Петр Алексеевич',
      email: 'sidorov@example.com',
      organization: 'НГУ',
      type: 'Докладчик',
      status: 'pending',
      registeredAt: '2024-12-12'
    }
  ]);

  const [abstracts] = useState<Abstract[]>([
    {
      id: '1',
      title: 'Применение машинного обучения в анализе данных',
      author: 'Иванов И.И.',
      email: 'ivanov@example.com',
      submittedAt: '2024-12-11',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Новые методы оптимизации алгоритмов',
      author: 'Сидоров П.А.',
      email: 'sidorov@example.com',
      submittedAt: '2024-12-12',
      status: 'pending'
    }
  ]);

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const handleApproveParticipant = (id: string) => {
    toast.success('Заявка одобрена, участник получит уведомление');
  };

  const handleRejectParticipant = (id: string) => {
    toast.success('Заявка отклонена');
  };

  const handleApproveAbstract = (id: string) => {
    toast.success('Тезисы одобрены');
  };

  const handleRejectAbstract = (id: string) => {
    toast.success('Тезисы отклонены');
  };

  const handleSendEmail = () => {
    if (!emailTemplate.subject || !emailTemplate.body) {
      toast.error('Заполните тему и текст письма');
      return;
    }
    
    const count = emailTemplate.recipientType === 'selected' ? selectedParticipants.length : participants.length;
    toast.success(`Рассылка запущена для ${count} получателей`);
    setEmailTemplate({ subject: '', body: '', recipientType: 'all' });
  };

  const toggleParticipantSelection = (id: string) => {
    setSelectedParticipants(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-600">Одобрено</Badge>;
      case 'pending':
        return <Badge variant="secondary">На модерации</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонено</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Icon name="Video" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">ConferenceHub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="text-sm">
                {currentRole === 'admin' ? 'Администратор' : 'Оператор'}
              </Badge>
              <span className="text-sm text-muted-foreground">Админ Системы</span>
              <Button variant="ghost" size="sm">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Панель управления</h2>
          <p className="text-muted-foreground">Управление конференцией и участниками</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Всего участников</CardDescription>
              <CardTitle className="text-3xl">156</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> за сегодня
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>На модерации</CardDescription>
              <CardTitle className="text-3xl">23</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Требуют проверки
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Тезисы</CardDescription>
              <CardTitle className="text-3xl">89</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-orange-600">8</span> на модерации
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Отправлено писем</CardDescription>
              <CardTitle className="text-3xl">342</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                За последние 7 дней
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="participants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="participants">
              <Icon name="Users" size={16} className="mr-2" />
              Участники
            </TabsTrigger>
            <TabsTrigger value="abstracts">
              <Icon name="FileText" size={16} className="mr-2" />
              Тезисы
            </TabsTrigger>
            <TabsTrigger value="mailing">
              <Icon name="Mail" size={16} className="mr-2" />
              Рассылка
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={currentRole === 'operator'}>
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Список участников</CardTitle>
                    <CardDescription>Управление регистрациями и статусами</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Поиск по имени или email" className="w-64" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="pending">На модерации</SelectItem>
                        <SelectItem value="approved">Одобрено</SelectItem>
                        <SelectItem value="rejected">Отклонено</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Участник</TableHead>
                      <TableHead>Организация</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedParticipants.includes(participant.id)}
                            onCheckedChange={() => toggleParticipantSelection(participant.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{participant.name}</div>
                            <div className="text-sm text-muted-foreground">{participant.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{participant.organization}</TableCell>
                        <TableCell>{participant.type}</TableCell>
                        <TableCell>{getStatusBadge(participant.status)}</TableCell>
                        <TableCell>{participant.registeredAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {participant.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleApproveParticipant(participant.id)}
                                >
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Одобрить
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectParticipant(participant.id)}
                                >
                                  <Icon name="X" size={14} className="mr-1" />
                                  Отклонить
                                </Button>
                              </>
                            )}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <Icon name="Eye" size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Информация об участнике</DialogTitle>
                                  <DialogDescription>Подробные данные регистрации</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-muted-foreground">ФИО</Label>
                                    <p className="font-medium">{participant.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Email</Label>
                                    <p className="font-medium">{participant.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Организация</Label>
                                    <p className="font-medium">{participant.organization}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Тип участия</Label>
                                    <p className="font-medium">{participant.type}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Дата регистрации</Label>
                                    <p className="font-medium">{participant.registeredAt}</p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Закрыть</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="abstracts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Тезисы докладов</CardTitle>
                    <CardDescription>Модерация поданных материалов</CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="pending">На модерации</SelectItem>
                      <SelectItem value="approved">Одобрено</SelectItem>
                      <SelectItem value="rejected">Отклонено</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead>Дата подачи</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {abstracts.map((abstract) => (
                      <TableRow key={abstract.id}>
                        <TableCell>
                          <div className="max-w-md">
                            <div className="font-medium">{abstract.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{abstract.author}</div>
                            <div className="text-sm text-muted-foreground">{abstract.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{abstract.submittedAt}</TableCell>
                        <TableCell>{getStatusBadge(abstract.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {abstract.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleApproveAbstract(abstract.id)}
                                >
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Одобрить
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectAbstract(abstract.id)}
                                >
                                  <Icon name="X" size={14} className="mr-1" />
                                  Отклонить
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost">
                              <Icon name="Download" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mailing" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Создать рассылку</CardTitle>
                  <CardDescription>Отправка уведомлений участникам</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-type">Получатели</Label>
                    <Select
                      value={emailTemplate.recipientType}
                      onValueChange={(value) => setEmailTemplate({ ...emailTemplate, recipientType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все участники</SelectItem>
                        <SelectItem value="approved">Только одобренные</SelectItem>
                        <SelectItem value="speakers">Только докладчики</SelectItem>
                        <SelectItem value="listeners">Только слушатели</SelectItem>
                        <SelectItem value="selected">Выбранные ({selectedParticipants.length})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема письма</Label>
                    <Input
                      id="subject"
                      placeholder="Введите тему письма"
                      value={emailTemplate.subject}
                      onChange={(e) => setEmailTemplate({ ...emailTemplate, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">Текст письма</Label>
                    <Textarea
                      id="body"
                      placeholder="Введите текст письма"
                      rows={10}
                      value={emailTemplate.body}
                      onChange={(e) => setEmailTemplate({ ...emailTemplate, body: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Доступные переменные: {'{name}'}, {'{email}'}, {'{organization}'}
                    </p>
                  </div>

                  <Button onClick={handleSendEmail} className="w-full" size="lg">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить рассылку
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Шаблоны писем</CardTitle>
                  <CardDescription>Готовые шаблоны для быстрой рассылки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setEmailTemplate({
                      subject: 'Приглашение на конференцию',
                      body: 'Здравствуйте, {name}!\n\nПриглашаем вас принять участие в конференции...',
                      recipientType: 'all'
                    })}
                  >
                    <Icon name="Mail" size={16} className="mr-2" />
                    Приглашение на конференцию
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setEmailTemplate({
                      subject: 'Подтверждение регистрации',
                      body: 'Здравствуйте, {name}!\n\nВаша регистрация подтверждена...',
                      recipientType: 'approved'
                    })}
                  >
                    <Icon name="CheckCircle" size={16} className="mr-2" />
                    Подтверждение регистрации
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setEmailTemplate({
                      subject: 'Напоминание о конференции',
                      body: 'Здравствуйте, {name}!\n\nНапоминаем, что конференция начнется...',
                      recipientType: 'approved'
                    })}
                  >
                    <Icon name="Bell" size={16} className="mr-2" />
                    Напоминание о событии
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setEmailTemplate({
                      subject: 'Доступ к материалам конференции',
                      body: 'Здравствуйте, {name}!\n\nМатериалы конференции доступны по ссылке...',
                      recipientType: 'approved'
                    })}
                  >
                    <Icon name="FolderOpen" size={16} className="mr-2" />
                    Материалы конференции
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setEmailTemplate({
                      subject: 'Статус тезисов',
                      body: 'Здравствуйте, {name}!\n\nВаши тезисы прошли модерацию...',
                      recipientType: 'speakers'
                    })}
                  >
                    <Icon name="FileCheck" size={16} className="mr-2" />
                    Уведомление о статусе тезисов
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>История рассылок</CardTitle>
                <CardDescription>Отправленные письма за последние 30 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Тема</TableHead>
                      <TableHead>Получатели</TableHead>
                      <TableHead>Дата отправки</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Приглашение на конференцию</TableCell>
                      <TableCell>156 участников</TableCell>
                      <TableCell>2024-12-10 14:30</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600">Доставлено</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Подтверждение регистрации</TableCell>
                      <TableCell>12 участников</TableCell>
                      <TableCell>2024-12-12 09:15</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600">Доставлено</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки конференции</CardTitle>
                <CardDescription>Основные параметры мероприятия</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Название конференции</Label>
                  <Input defaultValue="Международная научная конференция 2024" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Дата начала</Label>
                    <Input type="date" defaultValue="2024-12-15" />
                  </div>
                  <div className="space-y-2">
                    <Label>Дата окончания</Label>
                    <Input type="date" defaultValue="2024-12-15" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email организатора</Label>
                  <Input type="email" defaultValue="organizer@conference.com" />
                </div>
                <Button>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Администраторы и операторы системы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Админ Системы</div>
                      <div className="text-sm text-muted-foreground">admin@conference.com</div>
                    </div>
                    <Badge>Администратор</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Оператор Иванов</div>
                      <div className="text-sm text-muted-foreground">operator@conference.com</div>
                    </div>
                    <Badge variant="secondary">Оператор</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить пользователя
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
