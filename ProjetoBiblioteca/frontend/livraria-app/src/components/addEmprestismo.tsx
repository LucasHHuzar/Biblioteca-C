export const addEmprestimo = (emprestimo: any) => {
  return fetch('http://localhost:5077/api/emprestimos/adicionar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emprestimo),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Erro ao adicionar empréstimo');
    }
    return response.json();
  });
};
