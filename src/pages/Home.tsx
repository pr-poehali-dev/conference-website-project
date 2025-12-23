import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const conferenceDate = new Date('2024-12-15T09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = conferenceDate - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Video" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">ConferenceHub</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-secondary transition-colors">Главная</Link>
              <Link to="/about" className="text-sm font-medium hover:text-secondary transition-colors">О конференции</Link>
              <Link to="/program" className="text-sm font-medium hover:text-secondary transition-colors">Программа</Link>
              <Link to="/stream" className="text-sm font-medium hover:text-secondary transition-colors">Трансляция</Link>
              <Link to="/contacts" className="text-sm font-medium hover:text-secondary transition-colors">Контакты</Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Вход</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">Международная научная конференция 2024</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Платформа для обмена научными достижениями, презентации результатов исследований 
              и установления профессиональных контактов в формате онлайн
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <Icon name="Calendar" size={20} />
                <span>15 декабря 2024</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <Icon name="Clock" size={20} />
                <span>09:00 - 18:00 МСК</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <Icon name="MapPin" size={20} />
                <span>Онлайн формат</span>
              </div>
            </div>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Зарегистрироваться сейчас
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">До начала конференции</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-secondary mb-2">{timeLeft.days}</div>
                  <div className="text-sm text-muted-foreground">дней</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-secondary mb-2">{timeLeft.hours}</div>
                  <div className="text-sm text-muted-foreground">часов</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-secondary mb-2">{timeLeft.minutes}</div>
                  <div className="text-sm text-muted-foreground">минут</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-secondary mb-2">{timeLeft.seconds}</div>
                  <div className="text-sm text-muted-foreground">секунд</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Возможности платформы</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="UserPlus" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Быстрая регистрация</CardTitle>
                  <CardDescription>
                    Простая форма регистрации участников с подтверждением по email
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="FileText" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Прием тезисов</CardTitle>
                  <CardDescription>
                    Загрузка научных работ и тезисов через личный кабинет
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Video" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Онлайн трансляция</CardTitle>
                  <CardDescription>
                    Прямая трансляция всех секций и пленарных заседаний
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Calendar" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Программа мероприятия</CardTitle>
                  <CardDescription>
                    Детальное расписание с возможностью создания персонального плана
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Mail" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Уведомления</CardTitle>
                  <CardDescription>
                    Автоматическая рассылка приглашений и важных обновлений
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Users" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Личный кабинет</CardTitle>
                  <CardDescription>
                    Управление заявками, доступ к материалам и сертификатам
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6">Готовы принять участие?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Зарегистрируйтесь прямо сейчас и получите доступ к загрузке тезисов, 
                программе конференции и онлайн трансляции
              </p>
              <Link to="/register">
                <Button size="lg" className="px-8">
                  Зарегистрироваться
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© 2024 ConferenceHub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
