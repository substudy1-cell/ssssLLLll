import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // localStorage에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif' }}>
      <div className="max-w-2xl mx-auto">
        {/* 프로그레스 바 */}
        <div className="mb-12 mt-4">
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            할 일 목록
          </h1>
          <p className="text-slate-400 text-lg">
            오늘의 할 일을 관리하세요
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="mb-12">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="새로운 할 일을 입력하세요..."
              className="flex-1 px-5 py-4 bg-slate-700 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition border border-slate-600 hover:border-slate-500"
            />
            <button
              onClick={addTodo}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-900 font-semibold rounded-2xl transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              추가
            </button>
          </div>
        </div>

        {/* 할 일 목록 */}
        <div className="space-y-3 mb-8">
          {todos.length === 0 ? (
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-lg">아직 할 일이 없습니다.</p>
              <p className="text-slate-500 text-sm mt-2">새로운 할 일을 추가해보세요</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className="bg-slate-700/60 border border-slate-600 hover:border-cyan-400/30 rounded-2xl p-5 flex items-center gap-4 transition backdrop-blur-sm group"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-6 h-6 rounded-lg cursor-pointer accent-cyan-400 flex-shrink-0"
                />
                <span
                  className={`flex-1 text-lg font-medium transition ${
                    todo.completed
                      ? 'line-through text-slate-500'
                      : 'text-white'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* 통계 */}
        {todos.length > 0 && (
          <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-cyan-400/30 rounded-2xl p-6 text-center backdrop-blur-sm">
            <p className="text-slate-200 text-lg font-semibold">
              <span className="text-cyan-400 font-bold">{completedCount}</span>/<span className="text-slate-400">{totalCount}</span> 완료
            </p>
            <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
