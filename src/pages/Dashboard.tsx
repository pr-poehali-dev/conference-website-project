import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Dashboard = () => {
  const [abstract, setAbstract] = useState({
    title: '',
    authors: '',
    content: '',
    keywords: '',
    file: null as File | null
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Файл слишком большой. Максимальный размер: 5 МБ');
        return;
      }
      setAbstract({ ...abstract, file });
      toast.success(`Файл "${file.name}" загружен`);
    }
  };

  const handleSubmitAbstract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abstract.title || !abstract.content) {
      toast.error('Заполните обязательные поля');
      return;
    }
    toast.success('Тезисы успешно отправлены на модерацию');
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
              <span className="text-sm text-muted-foreground">Иван Иванов</span>
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
          <h2 className="text-3xl font-bold mb-2">Личный кабинет</h2>
          <p className="text-muted-foreground">Управление заявками и материалами конференции</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Статус регистрации</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <Badge variant="default" className="text-base">Подтверждена</Badge>
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Тип участия</CardDescription>
              <CardTitle className="text-xl">Докладчик</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Поданные тезисы</CardDescription>
              <CardTitle className="text-2xl">0</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>До конференции</CardDescription>
              <CardTitle className="text-2xl">12 дней</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="abstracts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="abstracts">Тезисы</TabsTrigger>
            <TabsTrigger value="program">Программа</TabsTrigger>
            <TabsTrigger value="materials">Материалы</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="abstracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Загрузка тезисов</CardTitle>
                <CardDescription>
                  Заполните форму и загрузите файл с тезисами вашего доклада
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitAbstract} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Название доклада *</Label>
                    <Input
                      id="title"
                      placeholder="Введите название доклада"
                      value={abstract.title}
                      onChange={(e) => setAbstract({ ...abstract, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authors">Авторы</Label>
                    <Input
                      id="authors"
                      placeholder="Иванов И.И., Петров П.П."
                      value={abstract.authors}
                      onChange={(e) => setAbstract({ ...abstract, authors: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Текст тезисов *</Label>
                    <Textarea
                      id="content"
                      placeholder="Введите текст тезисов (до 3000 символов)"
                      rows={8}
                      value={abstract.content}
                      onChange={(e) => setAbstract({ ...abstract, content: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      {abstract.content.length} / 3000 символов
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Ключевые слова</Label>
                    <Input
                      id="keywords"
                      placeholder="машинное обучение, искусственный интеллект"
                      value={abstract.keywords}
                      onChange={(e) => setAbstract({ ...abstract, keywords: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Загрузить файл (необязательно)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                      {abstract.file && (
                        <Badge variant="secondary">
                          <Icon name="FileText" size={14} className="mr-1" />
                          {abstract.file.name}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Форматы: PDF, DOC, DOCX. Максимальный размер: 5 МБ
                    </p>
                  </div>

                  <Button type="submit" size="lg">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить тезисы
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Мои тезисы</CardTitle>
                <CardDescription>Список поданных тезисов и их статус</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Пока нет поданных тезисов</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Программа конференции</CardTitle>
                <CardDescription>15 декабря 2024, 09:00 - 18:00 МСК</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Открытие конференции</h4>
                      <Badge>09:00 - 09:30</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Приветственное слово организаторов</p>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Пленарное заседание</h4>
                      <Badge>09:30 - 11:00</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Основные доклады ведущих специалистов</p>
                  </div>

                  <div className="border-l-4 border-muted pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Кофе-брейк</h4>
                      <Badge variant="outline">11:00 - 11:30</Badge>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Секционные заседания</h4>
                      <Badge>11:30 - 13:00</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Параллельные секции по направлениям</p>
                  </div>

                  <div className="border-l-4 border-muted pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Обеденный перерыв</h4>
                      <Badge variant="outline">13:00 - 14:00</Badge>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Секционные заседания (продолжение)</h4>
                      <Badge>14:00 - 16:30</Badge>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Закрытие конференции</h4>
                      <Badge>16:30 - 17:00</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Подведение итогов, награждение</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Материалы конференции</CardTitle>
                <CardDescription>Доступ к презентациям и документам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="FolderOpen" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Материалы будут доступны после начала конференции</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Информация о профиле</CardTitle>
                <CardDescription>Ваши данные участника</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">ФИО</Label>
                  <p className="font-medium">Иван Иванов</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">ivan.ivanov@example.com</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Организация</Label>
                  <p className="font-medium">Московский государственный университет</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Должность</Label>
                  <p className="font-medium">Профессор</p>
                </div>
                <Button variant="outline">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать профиль
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
