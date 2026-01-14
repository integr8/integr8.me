---
title: 'GitOps: O Futuro do Continuous Delivery com ArgoCD e Flux'
date: 2024-01-10
author: 'Integr8 Team'
description: 'Descubra como GitOps transforma a forma como times gerenciam infraestrutura e deployments em Kubernetes'
category: 'devops'
tags: ['GitOps', 'ArgoCD', 'Flux', 'Kubernetes', 'CI/CD']
image: '/images/blog/gitops-cover.png'
read_time: 8
featured: true
---

A forma como gerenciamos infraestrutura e deployments evoluiu dramaticamente nos últimos 5 anos. **GitOps** representa uma mudança de paradigma onde Git se torna a única fonte de verdade.

## O que é GitOps?

GitOps é um modelo operacional que aplica práticas DevOps à gestão de infraestrutura. Seus pilares são:

1. **Declarativo sobre Imperativo** - Todo o sistema é descrito declarativamente (YAML, Terraform)
2. **Git como Fonte de Verdade** - Estado desejado versionado no Git
3. **Reconciliação Automática** - Agentes garantem que estado atual = desejado
4. **Operações via Pull Request** - Mudanças através de PRs revisados por peers

## Benefícios do GitOps

### Rastreabilidade Completa

```
Commit de código → PR review → Merge → Deployment automático
```

Cada mudança é auditável e rastreável.

### Declarativo vs Imperativo

```yaml
# GitOps (Declarativo)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  image: myapi:v1.2.3
```

Vs. scripts imperativos que dizem "como" em vez de "o quê".

### Recuperação de Desastres

Se cluster é destruído, recriar é simples:

```bash
argocd app sync production
```

Tudo está no Git!

## ArgoCD vs Flux

### ArgoCD

- Dashboard visual
- UI para gerenciar aplicações
- Melhor para times iniciantes
- Pull model com polling

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/myrepo
    targetRevision: HEAD
    path: k8s/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### Flux

- CLI-first
- Mais flexível e composable
- Notification webhooks
- Push model mais rápido

```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: my-repo
spec:
  interval: 1m
  url: https://github.com/myorg/myrepo
  ref:
    branch: main

---
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: production
spec:
  interval: 10m
  sourceRef:
    kind: GitRepository
    name: my-repo
  path: ./kustomize/production
```

## Melhores Práticas

### 1. Separar Config de Código

```
myrepo/
  ├── src/                 # Código da aplicação
  │   ├── main.go
  │   └── Dockerfile
  └── k8s/
      ├── base/
      │   ├── deployment.yaml
      │   ├── service.yaml
      │   └── kustomization.yaml
      ├── overlays/
      │   ├── dev/
      │   ├── staging/
      │   └── prod/
```

### 2. Pull Requests para Infrastructure

```
# Antes: Deploy direto (perigoso!)
kubectl set image deployment/api api=myapi:v1.2.3

# Depois: Via PR (seguro!)
# PR altera k8s/prod/deployment.yaml
# Merge automático → Deployment automático
```

### 3. Drift Detection

ArgoCD/Flux detectam divergências:

```
Desired State (Git) ≠ Actual State (Cluster) → Alert!
```

### 4. Secrets Management

Use **Sealed Secrets** ou **External Secrets Operator**:

```yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-password
spec:
  encryptedData:
    password: AgBy3i+... # Encrypted, safe to commit
```

## Implementação Prática

### Day 1: Setup ArgoCD

```bash
# Install
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Add repo
argocd repo add https://github.com/myorg/myrepo --username [user] --password [token]

# Create application
argocd app create my-app \
  --repo https://github.com/myorg/myrepo \
  --path k8s/production \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace production
```

### Day 2: Enable Auto-Sync

```bash
argocd app set my-app --auto-prune --self-heal
```

Agora qualquer merge em `main` irá sincronizar automaticamente!

## Conclusão

GitOps não é apenas uma ferramenta, é uma **mudança cultural**. Permite:

✅ Toda mudança rastreável no Git  
✅ Deploy mais seguro via PRs  
✅ Recovery rápido em desastres  
✅ Experiência consistente entre ambientes  
✅ Compliance e auditoria automática

Se sua organização ainda faz deploys manuais, **é hora de migrar para GitOps**.
